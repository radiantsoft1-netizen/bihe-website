<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\JsonResponse;

class NewsCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $data = NewsCategory::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (NewsCategory $category) => [
                'id' => (string) $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
            ]);

        return response()->json(['data' => $data]);
    }
}
