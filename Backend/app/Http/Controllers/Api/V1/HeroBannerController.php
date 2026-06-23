<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\HeroBanner;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;

class HeroBannerController extends Controller
{
    public function index(): JsonResponse
    {
        $data = HeroBanner::active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($item) => [
                'id' => (string) $item->id,
                'eyebrow' => $item->eyebrow,
                'title' => $item->title,
                'subtitle' => $item->subtitle,
                'image' => StoredFileUrl::publicImage($item->image_path),
                'sortOrder' => $item->sort_order,
            ]);

        return response()->json(['data' => $data]);
    }
}
