<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AlumniEvent;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;

class AlumniEventController extends Controller
{
    private const LIST_COLUMNS = [
        'id',
        'slug',
        'title',
        'summary',
        'body',
        'event_date',
        'venue',
        'image_path',
        'published',
        'sort_order',
    ];

    public function index(): JsonResponse
    {
        $data = AlumniEvent::published()
            ->select(self::LIST_COLUMNS)
            ->orderByDesc('event_date')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (AlumniEvent $event) => $this->transform($event));

        return response()->json(['data' => $data]);
    }

    public function show(string $slug): JsonResponse
    {
        $event = AlumniEvent::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($event, includeBody: true)]);
    }

    protected function transform(AlumniEvent $event, bool $includeBody = false): array
    {
        $payload = [
            'id' => (string) $event->id,
            'slug' => $event->slug,
            'title' => $event->title,
            'summary' => $event->summary,
            'eventDate' => $event->event_date?->toDateString(),
            'venue' => $event->venue,
            'image' => StoredFileUrl::publicImage($event->image_path),
            'href' => '/alumni/events/'.$event->slug,
            'dateLabel' => $event->event_date?->format('d M'),
            'yearLabel' => $event->event_date?->format('Y'),
            'published' => $event->published,
            'sortOrder' => $event->sort_order,
        ];

        if ($includeBody) {
            $payload['body'] = $event->body;
            $payload['bodyParagraphs'] = $this->paragraphsFromBody($event->body);
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
