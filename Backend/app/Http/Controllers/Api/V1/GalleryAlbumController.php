<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\GalleryAlbum;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryAlbumController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GalleryAlbum::published()
            ->select([
                'id',
                'gallery_category_id',
                'title',
                'slug',
                'featured_media_id',
                'published',
                'is_featured',
                'sort_order',
            ])
            ->with([
                'category:id,name,slug',
                'featuredMedia:id,image_path',
            ])
            ->withCount('media')
            ->orderBy('sort_order')
            ->orderByDesc('id');

        if ($request->boolean('featured')) {
            $query->featured();
        }

        if ($request->filled('category')) {
            $slug = $request->query('category');
            $query->whereHas('category', fn ($builder) => $builder->where('slug', $slug));
        }

        $data = $query->get()->map(fn (GalleryAlbum $album) => $this->transformAlbum($album));

        return response()->json(['data' => $data]);
    }

    public function show(string $slug): JsonResponse
    {
        $album = GalleryAlbum::published()
            ->with(['category', 'featuredMedia', 'media'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $this->transformAlbum($album, includeMedia: true)]);
    }

    protected function transformAlbum(GalleryAlbum $album, bool $includeMedia = false): array
    {
        $payload = [
            'id' => (string) $album->id,
            'title' => $album->title,
            'slug' => $album->slug,
            'description' => $album->description,
            'category' => $album->category ? [
                'id' => (string) $album->category->id,
                'name' => $album->category->name,
                'slug' => $album->category->slug,
            ] : null,
            'imageCount' => (int) $album->media_count,
            'isFeatured' => $album->is_featured,
            'sortOrder' => $album->sort_order,
            'coverImage' => $this->coverImageUrl($album),
            'coverMediaId' => $album->featured_media_id ? (string) $album->featured_media_id : null,
        ];

        if ($includeMedia) {
            $payload['media'] = $album->media->map(fn ($media) => [
                'id' => (string) $media->id,
                'type' => $media->type->value,
                'title' => $media->title,
                'image' => StoredFileUrl::publicImage($media->image_path),
                'previewUrl' => $media->image_path ? url('/api/v1/gallery-media/'.$media->id.'/preview') : null,
                'youtubeUrl' => $media->youtube_url,
                'youtubeId' => $media->youtube_id,
                'sortOrder' => $media->sort_order,
            ]);
        }

        return $payload;
    }

    protected function coverImageUrl(GalleryAlbum $album): ?string
    {
        if ($album->featuredMedia?->image_path) {
            return StoredFileUrl::publicImage($album->featuredMedia->image_path);
        }

        return null;
    }
}
