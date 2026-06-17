<?php

namespace App\Services;

use App\Http\Requests\Admin\StorePlacementDriveRequest;
use App\Http\Requests\Admin\UpdatePlacementDriveRequest;
use App\Models\PlacementDrive;
use App\Support\UniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlacementDriveService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
        private RichHtmlSanitizer $richHtml,
    ) {
    }

    public function paginateForIndex(int $perPage = 15): LengthAwarePaginator
    {
        return PlacementDrive::query()
            ->select(['id', 'title', 'slug', 'event_date', 'published', 'sort_order'])
            ->orderByDesc('event_date')
            ->orderBy('sort_order')
            ->paginate($perPage);
    }

    public function create(StorePlacementDriveRequest $request): PlacementDrive
    {
        $drive = new PlacementDrive($this->prepareAttributes($request));
        $drive->save();

        return $drive;
    }

    public function update(UpdatePlacementDriveRequest $request, PlacementDrive $placementDrive): PlacementDrive
    {
        $placementDrive->fill($this->prepareAttributes($request, $placementDrive));
        $placementDrive->save();

        return $placementDrive;
    }

    public function delete(PlacementDrive $placementDrive): void
    {
        foreach ($placementDrive->gallery_images ?? [] as $image) {
            if (is_array($image) && ! empty($image['path'])) {
                $this->uploads->delete($image['path']);
            }
        }

        $placementDrive->delete();
    }

    protected function prepareAttributes(
        StorePlacementDriveRequest|UpdatePlacementDriveRequest $request,
        ?PlacementDrive $existing = null,
    ): array {
        $validated = $request->validated();

        $validated['slug'] = UniqueSlug::forModel(
            PlacementDrive::class,
            $validated['slug'] ?? null,
            $validated['title'],
            $existing?->id
        );
        $validated['published'] = $request->boolean('published');
        $validated = $this->richHtml->cleanFields($validated, ['intro_body', 'section2_body']);
        $validated['gallery_images'] = $this->prepareGalleryImages($request, $existing);
        unset($validated['gallery'], $validated['images'], $validated['gallery_library_paths'], $validated['keep_gallery_paths']);

        return $validated;
    }

    /** @return list<array{path: string, alt: string}> */
    protected function prepareGalleryImages(
        StorePlacementDriveRequest|UpdatePlacementDriveRequest $request,
        ?PlacementDrive $existing = null,
    ): array {
        $existingGallery = collect($existing?->gallery_images ?? [])
            ->filter(fn ($image) => is_array($image) && ! empty($image['path']))
            ->keyBy('path');

        $keepPaths = collect($request->input('keep_gallery_paths', []))
            ->map(fn ($path) => trim((string) $path))
            ->filter()
            ->values();

        foreach ($existingGallery as $path => $image) {
            if (! $keepPaths->contains($path)) {
                $this->uploads->delete($path);
            }
        }

        $gallery = [];

        foreach ($keepPaths as $path) {
            $stored = $existingGallery->get($path);

            $gallery[] = [
                'path' => $path,
                'alt' => trim((string) ($stored['alt'] ?? '')) ?: 'Placement drive photo',
            ];
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $upload = $this->uploads->store(
                    $file,
                    'image',
                    config('uploads.directories.placement_drive_image')
                );

                $gallery[] = [
                    'path' => $upload->path,
                    'alt' => $upload->sanitizedOriginalName,
                ];
            }
        }

        foreach ($request->input('gallery_library_paths', []) as $libraryPath) {
            $libraryPath = trim((string) $libraryPath);

            if ($libraryPath === '' || ! $this->mediaLibrary->validatePath($libraryPath, 'image')) {
                continue;
            }

            $gallery[] = [
                'path' => $libraryPath,
                'alt' => 'Placement drive photo',
            ];
        }

        return $gallery;
    }
}
