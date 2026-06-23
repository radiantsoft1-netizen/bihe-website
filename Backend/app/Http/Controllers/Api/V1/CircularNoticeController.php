<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CircularNotice;
use App\Services\SecureFileUploadService;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CircularNoticeController extends Controller
{
    private const LIST_COLUMNS = [
        'id',
        'slug',
        'title',
        'subtitle',
        'excerpt',
        'published_date',
        'image_path',
        'image_alt',
        'pdf_path',
        'pdf_name',
        'published',
        'sort_order',
    ];

    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function index(): JsonResponse
    {
        $data = CircularNotice::published()
            ->select(self::LIST_COLUMNS)
            ->orderByDesc('published_date')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (CircularNotice $notice) => $this->transform($notice));

        return response()->json(['data' => $data]);
    }

    public function show(string $slug): JsonResponse
    {
        $notice = CircularNotice::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($notice, includeBody: true)]);
    }

    public function pdf(string $slug): StreamedResponse
    {
        $notice = CircularNotice::published()
            ->where('slug', $slug)
            ->firstOrFail();

        if (! $notice->pdf_path || ! $this->uploads->resolveDisk($notice->pdf_path)) {
            abort(404);
        }

        return $this->uploads->stream(
            $notice->pdf_path,
            null,
            $notice->pdf_name ?: 'notice.pdf',
            'inline',
            'application/pdf',
        );
    }

    protected function transform(CircularNotice $notice, bool $includeBody = false): array
    {
        $payload = [
            'id' => (string) $notice->id,
            'slug' => $notice->slug,
            'title' => $notice->title,
            'subtitle' => $notice->subtitle,
            'excerpt' => $notice->excerpt,
            'publishedDate' => $notice->published_date?->toDateString(),
            'publishedDateLabel' => $notice->published_date?->format('F j, Y'),
            'image' => StoredFileUrl::publicImage($notice->image_path),
            'imageAlt' => $notice->image_alt,
            'pdf' => $notice->pdf_path ? StoredFileUrl::circularNoticePdf($notice->slug) : null,
            'pdfName' => $notice->pdf_name,
            'published' => $notice->published,
            'sortOrder' => $notice->sort_order,
        ];

        if ($includeBody) {
            $payload['content'] = $this->paragraphsFromBody($notice->body);
            $payload['body'] = $notice->body;
        }

        return $payload;
    }

    /** @return list<string> */
    protected function paragraphsFromBody(?string $body): array
    {
        if (! $body) {
            return [];
        }

        return array_values(array_filter(array_map(
            static fn (string $paragraph) => trim($paragraph),
            preg_split("/\r\n\r\n|\n\n/", $body) ?: []
        )));
    }
}
