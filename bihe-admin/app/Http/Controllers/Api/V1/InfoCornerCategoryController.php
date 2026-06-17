<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\InfoCornerCategory;
use App\Models\InfoCornerItem;
use App\Services\SecureFileUploadService;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InfoCornerCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $data = InfoCornerCategory::published()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (InfoCornerCategory $category) => [
                'id' => (string) $category->id,
                'slug' => $category->slug,
                'name' => $category->name,
                'description' => $category->description,
                'href' => '/info-corner/'.$category->slug,
                'sortOrder' => $category->sort_order,
            ]);

        return response()->json(['data' => $data]);
    }
}
