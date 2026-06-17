<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PlacementDrive;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;

class PlacementDriveController extends Controller
{
    private const LIST_COLUMNS = [
        'id',
        'slug',
        'title',
        'eyebrow',
        'description',
        'hero_lead',
        'event_date',
        'date_label',
        'year_label',
        'intro_body',
        'section2_title',
        'section2_body',
        'gallery_images',
        'published',
        'sort_order',
    ];

    public function index(): JsonResponse
    {
        $data = PlacementDrive::published()
            ->select(self::LIST_COLUMNS)
            ->orderByDesc('event_date')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (PlacementDrive $drive) => $this->transform($drive));

        return response()->json(['data' => $data]);
    }

    public function show(string $slug): JsonResponse
    {
        $drive = PlacementDrive::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($drive, includeBody: true)]);
    }

    protected function transform(PlacementDrive $drive, bool $includeBody = false): array
    {
        $payload = [
            'id' => (string) $drive->id,
            'slug' => $drive->slug,
            'title' => $drive->title,
            'eyebrow' => $drive->eyebrow,
            'description' => $drive->description,
            'heroLead' => $drive->hero_lead,
            'eventDate' => $drive->event_date?->toDateString(),
            'dateLabel' => $drive->date_label,
            'yearLabel' => $drive->year_label,
            'href' => '/student-life/placement-cell-and-activities/'.$drive->slug,
            'published' => $drive->published,
            'sortOrder' => $drive->sort_order,
        ];

        if ($includeBody) {
            $payload['introParagraphs'] = $this->paragraphsFromBody($drive->intro_body);
            $payload['introBody'] = $drive->intro_body;
            $payload['section2Title'] = $drive->section2_title;
            $payload['section2Paragraphs'] = $this->paragraphsFromBody($drive->section2_body);
            $payload['section2Body'] = $drive->section2_body;
            $payload['galleryImages'] = $this->transformGallery($drive->gallery_images);
        }

        $cardImage = $this->firstGalleryImage($drive->gallery_images);
        if ($cardImage) {
            $payload['cardImage'] = $cardImage['src'];
            $payload['cardImageAlt'] = $cardImage['alt'];
        }

        return $payload;
    }

    /** @return array{src: string, alt: string}|null */
    protected function firstGalleryImage(?array $gallery): ?array
    {
        $images = $this->transformGallery($gallery);

        return $images[0] ?? null;
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

    /** @return list<array{src: string|null, alt: string}> */
    protected function transformGallery(?array $gallery): array
    {
        if (! is_array($gallery)) {
            return [];
        }

        return collect($gallery)
            ->filter(fn ($item) => is_array($item) && ! empty($item['path']))
            ->map(fn (array $item) => [
                'src' => StoredFileUrl::publicImage($item['path']),
                'alt' => (string) ($item['alt'] ?? 'Placement drive photo'),
            ])
            ->values()
            ->all();
    }
}
