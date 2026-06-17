<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\GalleryAlbum;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Legacy homepage gallery endpoint — returns featured album covers.
 */
class GalleryItemController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GalleryAlbum::published()
            ->with(['category', 'featuredMedia'])
            ->orderByDesc('is_featured')
            ->orderBy('sort_order');

        if ($request->boolean('featured')) {
            $query->featured();
        }

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($builder) => $builder->where('slug', $request->query('category')));
        }

        $data = $query->limit(12)->get()->map(fn (GalleryAlbum $album) => [
            'id' => $album->slug,
            'albumId' => (string) $album->id,
            'title' => $album->title,
            'slug' => $album->slug,
            'category' => $album->category?->name ?? 'Gallery',
            'details' => $album->description,
            'image' => StoredFileUrl::publicImage($album->featuredMedia?->image_path),
            'coverMediaId' => $album->featured_media_id ? (string) $album->featured_media_id : null,
            'published' => $album->published,
            'sortOrder' => $album->sort_order,
            'isFeatured' => $album->is_featured,
        ]);

        return response()->json(['data' => $data]);
    }
}
