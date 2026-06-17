<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use Illuminate\Http\JsonResponse;

class GalleryCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $data = GalleryCategory::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (GalleryCategory $category) => [
                'id' => (string) $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
            ]);

        return response()->json(['data' => $data]);
    }
}
