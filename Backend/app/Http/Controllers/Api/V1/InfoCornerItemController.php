<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\InfoCornerItem;
use App\Services\SecureFileUploadService;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InfoCornerItemController extends Controller
{
    private const LIST_COLUMNS = [
        'id',
        'info_corner_category_id',
        'title',
        'badge_text',
        'badge_visible',
        'slug',
        'subtitle',
        'excerpt',
        'published_date',
        'image_path',
        'image_alt',
        'pdf_path',
        'pdf_name',
        'external_link',
        'show_in_home_scroller',
        'published',
        'sort_order',
    ];

    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $query = InfoCornerItem::published()
            ->select(self::LIST_COLUMNS)
            ->with([
                'category:id,slug,name',
                'categories:id,slug,name',
            ])
            ->orderByDesc('published_date')
            ->orderBy('sort_order');

        if ($request->filled('category')) {
            $query->inCategory($request->query('category'));
        }

        $data = $query->get()->map(fn (InfoCornerItem $item) => $this->transform($item));

        return response()->json(['data' => $data]);
    }

    public function homeScroller(): JsonResponse
    {
        $data = InfoCornerItem::published()
            ->homeScroller()
            ->select(self::LIST_COLUMNS)
            ->with([
                'category:id,slug,name',
                'categories:id,slug,name',
            ])
            ->orderByDesc('published_date')
            ->orderBy('sort_order')
            ->limit(20)
            ->get()
            ->map(fn (InfoCornerItem $item) => $this->transform($item, includeBody: false));

        return response()->json(['data' => $data]);
    }

    public function show(string $categorySlug, string $slug): JsonResponse
    {
        $item = InfoCornerItem::published()
            ->with([
                'category',
                'categories:id,slug,name',
                'images',
            ])
            ->where('slug', $slug)
            ->inCategory($categorySlug)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($item, includeBody: true, contextCategorySlug: $categorySlug)]);
    }

    public function pdf(string $categorySlug, string $slug): StreamedResponse
    {
        $item = InfoCornerItem::published()
            ->where('slug', $slug)
            ->inCategory($categorySlug)
            ->firstOrFail();

        if (! $item->pdf_path || ! $this->uploads->resolveDisk($item->pdf_path)) {
            abort(404);
        }

        return $this->uploads->stream(
            $item->pdf_path,
            null,
            $item->pdf_name ?: 'document.pdf',
            'inline',
            'application/pdf',
        );
    }

    protected function transform(
        InfoCornerItem $item,
        bool $includeBody = true,
        ?string $contextCategorySlug = null,
    ): array {
        $contextCategory = $contextCategorySlug
            ? $item->categories->firstWhere('slug', $contextCategorySlug) ?? $item->category
            : $item->category;

        $payload = [
            'id' => (string) $item->id,
            'title' => $item->title,
            'badgeText' => $item->badge_text,
            'badgeVisible' => $item->badge_visible,
            'badgeLabel' => $this->resolveBadgeLabel($item),
            'slug' => $item->slug,
            'subtitle' => $item->subtitle,
            'excerpt' => $item->excerpt,
            'publishedDate' => $item->published_date?->toDateString(),
            'publishedDateLabel' => $item->published_date?->format('F j, Y'),
            'image' => StoredFileUrl::publicImage($item->image_path),
            'imageAlt' => $item->image_alt,
            'images' => $item->relationLoaded('images')
                ? $item->images
                    ->map(fn ($image) => [
                        'id' => (string) $image->id,
                        'url' => StoredFileUrl::publicImage($image->image_path),
                        'alt' => $item->image_alt,
                    ])
                    ->values()
                    ->all()
                : [],
            'pdf' => $item->pdf_path
                ? StoredFileUrl::infoCornerItemPdf($contextCategory?->slug ?? '', $item->slug)
                : null,
            'pdfName' => $item->pdf_name,
            'externalLink' => $item->external_link,
            'showInHomeScroller' => $item->show_in_home_scroller,
            'category' => $contextCategory ? [
                'id' => (string) $contextCategory->id,
                'slug' => $contextCategory->slug,
                'name' => $contextCategory->name,
                'href' => '/info-corner/'.$contextCategory->slug,
            ] : null,
            'categories' => $item->categories
                ->map(fn ($category) => [
                    'id' => (string) $category->id,
                    'slug' => $category->slug,
                    'name' => $category->name,
                    'href' => '/info-corner/'.$category->slug,
                ])
                ->values()
                ->all(),
            'href' => $contextCategory
                ? '/info-corner/'.$contextCategory->slug.'/'.$item->slug
                : null,
        ];

        if ($includeBody) {
            $payload['content'] = $this->paragraphsFromBody($item->body);
            $payload['body'] = $item->body;
        }

        return $payload;
    }

    protected function resolveBadgeLabel(InfoCornerItem $item): string
    {
        $custom = trim((string) ($item->badge_text ?? ''));

        if ($custom !== '') {
            return $custom;
        }

        $referenceDate = $item->published_date ?? $item->created_at;

        if ($referenceDate && $referenceDate->greaterThanOrEqualTo(now()->subDays(14)->startOfDay())) {
            return 'New';
        }

        return 'Notice';
    }

    /** @return list<string> */
    protected function paragraphsFromBody(?string $body): array
    {
        if (! $body) {
            return [];
        }

        $normalized = trim($body);

        if ($normalized === '') {
            return [];
        }

        if (preg_match('/<[^>]+>/', $normalized)) {
            if (preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $normalized, $matches)) {
                return array_values(array_filter(array_map(
                    static fn (string $paragraph) => trim(strip_tags($paragraph)),
                    $matches[1]
                )));
            }

            $text = trim(preg_replace('/\s+/u', ' ', strip_tags($normalized)) ?? '');

            return $text !== '' ? [$text] : [];
        }

        return array_values(array_filter(array_map(
            static fn (string $paragraph) => trim($paragraph),
            preg_split("/\r\n\r\n|\n\n/", $normalized) ?: []
        )));
    }
}
