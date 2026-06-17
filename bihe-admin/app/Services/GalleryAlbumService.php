<?php

namespace App\Services;

use App\Enums\GalleryMediaType;
use App\Http\Requests\Admin\StoreGalleryAlbumRequest;
use App\Http\Requests\Admin\UpdateGalleryAlbumRequest;
use App\Models\GalleryAlbum;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use App\Support\UniqueSlug;
use App\Support\YoutubeUrl;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class GalleryAlbumService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private RichHtmlSanitizer $richHtml,
        private MediaLibraryService $mediaLibrary,
    ) {
    }

    public function paginateForIndex(int $perPage = 15): LengthAwarePaginator
    {
        return GalleryAlbum::query()
            ->select([
                'id',
                'gallery_category_id',
                'title',
                'featured_media_id',
                'published',
                'is_featured',
                'sort_order',
            ])
            ->with([
                'category:id,name',
                'featuredMedia:id,image_path',
            ])
            ->withCount('media')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->paginate($perPage);
    }

    public function activeCategories(): Collection
    {
        return GalleryCategory::active()->orderBy('sort_order')->orderBy('name')->get();
    }

    public function create(StoreGalleryAlbumRequest $request): GalleryAlbum
    {
        $album = GalleryAlbum::create($this->albumAttributes($request));

        $this->storeUploadedImages($request, $album);
        $this->storeYoutubeLink($request, $album);
        $this->syncFeaturedMedia($album, $request->input('featured_media_id'));

        return $album;
    }

    public function update(UpdateGalleryAlbumRequest $request, GalleryAlbum $album): GalleryAlbum
    {
        $album->update($this->albumAttributes($request, $album));

        $this->syncExistingImages($request, $album);
        $this->storeUploadedImages($request, $album);
        $this->storeYoutubeLink($request, $album);
        $this->updateMediaOrdering($request, $album);
        $this->syncFeaturedMedia($album, $request->input('featured_media_id'));

        return $album;
    }

    public function delete(GalleryAlbum $album): void
    {
        foreach ($album->media as $media) {
            $this->deleteMediaFile($media);
        }

        $album->delete();
    }

    public function deleteMedia(GalleryAlbum $album, GalleryMedia $media): void
    {
        abort_unless($media->gallery_album_id === $album->id, 404);

        if ($album->featured_media_id === $media->id) {
            $album->update(['featured_media_id' => null]);
        }

        $this->deleteMediaFile($media);
        $media->delete();
    }

    protected function albumAttributes(
        StoreGalleryAlbumRequest|UpdateGalleryAlbumRequest $request,
        ?GalleryAlbum $existing = null
    ): array {
        $validated = $request->validated();

        unset(
            $validated['images'],
            $validated['image_library_paths'],
            $validated['keep_image_ids'],
            $validated['youtube_url'],
            $validated['youtube_title'],
            $validated['featured_media_id'],
            $validated['media_order'],
        );

        $validated['slug'] = UniqueSlug::forModel(
            GalleryAlbum::class,
            $validated['slug'] ?? null,
            $validated['title'],
            $existing?->id
        );
        $validated['published'] = $request->boolean('published');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['gallery_category_id'] = $validated['gallery_category_id'] ?? null;
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        return $validated;
    }

    protected function storeUploadedImages(StoreGalleryAlbumRequest|UpdateGalleryAlbumRequest $request, GalleryAlbum $album): void
    {
        $nextOrder = (int) $album->media()->max('sort_order') + 1;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $upload = $this->uploads->store(
                    $file,
                    'image',
                    config('uploads.directories.gallery')
                );

                GalleryMedia::create([
                    'gallery_album_id' => $album->id,
                    'type' => GalleryMediaType::Image,
                    'title' => pathinfo($upload->sanitizedOriginalName, PATHINFO_FILENAME),
                    'image_path' => $upload->path,
                    'sort_order' => $nextOrder++,
                ]);
            }
        }

        foreach ($request->input('image_library_paths', []) as $libraryPath) {
            $libraryPath = trim((string) $libraryPath);

            if ($libraryPath === '' || ! $this->mediaLibrary->validatePath($libraryPath, 'image')) {
                continue;
            }

            GalleryMedia::create([
                'gallery_album_id' => $album->id,
                'type' => GalleryMediaType::Image,
                'title' => pathinfo(basename($libraryPath), PATHINFO_FILENAME),
                'image_path' => $libraryPath,
                'sort_order' => $nextOrder++,
            ]);
        }
    }

    protected function syncExistingImages(UpdateGalleryAlbumRequest $request, GalleryAlbum $album): void
    {
        $keepIds = collect($request->input('keep_image_ids', []))
            ->map(fn ($id) => (int) $id)
            ->filter()
            ->intersect($album->media()->where('type', GalleryMediaType::Image)->pluck('id'))
            ->values();

        foreach ($album->media()->where('type', GalleryMediaType::Image)->get() as $media) {
            if ($keepIds->contains($media->id)) {
                continue;
            }

            if ($album->featured_media_id === $media->id) {
                $album->update(['featured_media_id' => null]);
            }

            $this->deleteMediaFile($media);
            $media->delete();
        }
    }

    protected function storeYoutubeLink(StoreGalleryAlbumRequest|UpdateGalleryAlbumRequest $request, GalleryAlbum $album): void
    {
        $url = trim((string) $request->input('youtube_url'));
        if ($url === '') {
            return;
        }

        $videoId = YoutubeUrl::extractId($url);
        if (! $videoId) {
            return;
        }

        $nextOrder = (int) $album->media()->max('sort_order') + 1;

        GalleryMedia::create([
            'gallery_album_id' => $album->id,
            'type' => GalleryMediaType::Youtube,
            'title' => $request->input('youtube_title') ?: 'YouTube video',
            'youtube_url' => $url,
            'youtube_id' => $videoId,
            'sort_order' => $nextOrder,
        ]);
    }

    protected function updateMediaOrdering(UpdateGalleryAlbumRequest $request, GalleryAlbum $album): void
    {
        $orders = $request->input('media_order', []);
        if (! is_array($orders)) {
            return;
        }

        foreach ($orders as $mediaId => $sortOrder) {
            $album->media()->where('id', $mediaId)->update([
                'sort_order' => (int) $sortOrder,
            ]);
        }
    }

    protected function syncFeaturedMedia(GalleryAlbum $album, mixed $featuredMediaId): void
    {
        if (! $featuredMediaId) {
            $firstImage = $album->media()->where('type', GalleryMediaType::Image)->orderBy('sort_order')->first();
            $album->update(['featured_media_id' => $firstImage?->id]);

            return;
        }

        $media = $album->media()->where('id', $featuredMediaId)->where('type', GalleryMediaType::Image)->first();
        $album->update(['featured_media_id' => $media?->id]);
    }

    protected function deleteMediaFile(GalleryMedia $media): void
    {
        $this->uploads->delete($media->image_path);
    }
}
