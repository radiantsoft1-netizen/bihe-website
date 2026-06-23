<?php

namespace App\Services\Alumni;

use App\Http\Requests\Admin\StoreAlumniEventRequest;
use App\Http\Requests\Admin\UpdateAlumniEventRequest;
use App\Models\AlumniEvent;
use App\Services\MediaLibraryService;
use App\Services\RichHtmlSanitizer;
use App\Services\SecureFileUploadService;
use App\Support\UniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AlumniEventService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
        private RichHtmlSanitizer $richHtml,
    ) {
    }

    public function paginateForIndex(int $perPage = 15): LengthAwarePaginator
    {
        return AlumniEvent::query()
            ->select([
                'id',
                'slug',
                'title',
                'event_date',
                'venue',
                'image_path',
                'published',
                'sort_order',
            ])
            ->orderByDesc('event_date')
            ->orderBy('sort_order')
            ->paginate($perPage);
    }

    public function create(StoreAlumniEventRequest $request): AlumniEvent
    {
        $event = new AlumniEvent($this->prepareAttributes($request));
        $event->save();

        return $event;
    }

    public function update(UpdateAlumniEventRequest $request, AlumniEvent $event): AlumniEvent
    {
        $event->fill($this->prepareAttributes($request, $event));
        $event->save();

        return $event;
    }

    public function delete(AlumniEvent $event): void
    {
        $this->uploads->delete($event->image_path);
        $event->delete();
    }

    public function updateSortOrder(AlumniEvent $event, int $sortOrder): AlumniEvent
    {
        $event->update(['sort_order' => $sortOrder]);

        return $event;
    }

    /** @param list<array{id: int, sort_order: int}> $orders */
    public function updateSortOrders(array $orders): void
    {
        foreach ($orders as $order) {
            AlumniEvent::query()
                ->whereKey($order['id'])
                ->update(['sort_order' => $order['sort_order']]);
        }
    }

    protected function prepareAttributes(
        StoreAlumniEventRequest|UpdateAlumniEventRequest $request,
        ?AlumniEvent $existing = null,
    ): array {
        $validated = $request->validated();

        $validated['slug'] = UniqueSlug::forModel(
            AlumniEvent::class,
            $validated['slug'] ?? null,
            $validated['title'],
            $existing?->id,
        );
        $validated['published'] = $request->boolean('published', $existing === null);
        $validated = $this->richHtml->cleanFields($validated, ['body']);

        unset($validated['image'], $validated['image_library_path']);

        if ($request->hasFile('image')) {
            if ($existing?->image_path) {
                $this->uploads->delete($existing->image_path);
            }

            $upload = $this->uploads->store(
                $request->file('image'),
                'image',
                config('uploads.directories.alumni_event_image')
            );
            $validated['image_path'] = $upload->path;
        } elseif ($request->filled('image_library_path')) {
            $libraryPath = (string) $request->input('image_library_path');

            if ($this->mediaLibrary->validatePath($libraryPath, 'image')) {
                if ($existing?->image_path && $existing->image_path !== $libraryPath) {
                    $this->uploads->delete($existing->image_path);
                }

                $validated['image_path'] = $libraryPath;
            }
        }

        return $validated;
    }
}
