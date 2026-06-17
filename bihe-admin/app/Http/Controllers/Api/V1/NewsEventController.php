<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\NewsEvent;
use App\Services\SecureFileUploadService;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class NewsEventController extends Controller
{
    /** Columns for list/ticker API responses (excludes long `body`). */
    private const LIST_COLUMNS = [
        'id',
        'news_category_id',
        'title',
        'slug',
        'summary',
        'event_date',
        'image_path',
        'pdf_path',
        'pdf_name',
        'published',
        'is_featured',
        'show_in_ticker',
        'sort_order',
        'seo_title',
        'seo_description',
        'seo_keywords',
    ];

    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $query = NewsEvent::published()
            ->select(self::LIST_COLUMNS)
            ->with('category:id,name,slug')
            ->orderByDesc('is_featured')
            ->orderByDesc('event_date')
            ->orderBy('sort_order');

        if ($request->boolean('featured')) {
            $query->featured();
        }

        if ($request->filled('category')) {
            $slug = $request->query('category');
            $query->whereHas('category', fn ($builder) => $builder->where('slug', $slug));
        }

        $data = $query->get()->map(fn (NewsEvent $item) => $this->transform($item));

        return response()->json(['data' => $data]);
    }

    public function ticker(): JsonResponse
    {
        $data = NewsEvent::published()
            ->select(self::LIST_COLUMNS)
            ->ticker()
            ->with('category:id,name,slug')
            ->orderByDesc('event_date')
            ->orderBy('sort_order')
            ->limit(12)
            ->get()
            ->map(fn (NewsEvent $item) => $this->transform($item, includeBody: false));

        return response()->json(['data' => $data]);
    }

    public function show(string $slug): JsonResponse
    {
        $item = NewsEvent::published()
            ->with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($item, includeBody: true, includeSeo: true)]);
    }

    public function pdf(string $slug): StreamedResponse
    {
        $item = NewsEvent::published()
            ->where('slug', $slug)
            ->firstOrFail();

        if (! $item->pdf_path || ! $this->uploads->resolveDisk($item->pdf_path)) {
            abort(404);
        }

        return $this->uploads->stream(
            $item->pdf_path,
            null,
            $item->pdf_name ?: 'news.pdf',
            'inline',
            'application/pdf',
        );
    }

    protected function transform(NewsEvent $item, bool $includeBody = true, bool $includeSeo = false): array
    {
        $payload = [
            'id' => (string) $item->id,
            'title' => $item->title,
            'slug' => $item->slug,
            'description' => $item->summary,
            'summary' => $item->summary,
            'date' => $item->event_date?->format('M Y'),
            'eventDate' => $item->event_date?->toDateString(),
            'image' => StoredFileUrl::publicImage($item->image_path),
            'pdf' => $item->pdf_path ? StoredFileUrl::newsPdf($item->slug) : null,
            'pdfName' => $item->pdf_name,
            'category' => $item->category ? [
                'id' => (string) $item->category->id,
                'name' => $item->category->name,
                'slug' => $item->category->slug,
            ] : null,
            'isFeatured' => $item->is_featured,
            'showInTicker' => $item->show_in_ticker,
            'published' => $item->published,
            'sortOrder' => $item->sort_order,
        ];

        if ($includeBody) {
            $payload['content'] = $item->body;
            $payload['body'] = $item->body;
        }

        if ($includeSeo) {
            $payload['seo'] = [
                'title' => $item->seo_title,
                'description' => $item->seo_description,
                'keywords' => $item->seo_keywords,
            ];
        }

        return $payload;
    }
}
