<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\GoverningBody;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;

class GoverningBodyController extends Controller
{
    public function index(): JsonResponse
    {
        $data = GoverningBody::published()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (GoverningBody $item) => [
                'id' => $item->slug,
                'reverse' => $item->reverse_layout,
                'profile' => [
                    'name' => $item->name,
                    'titleLine' => $item->title_line,
                    'qualifications' => $item->qualifications,
                ],
                'badge' => $item->badge,
                'title' => [
                    'lead' => $item->title_lead,
                    'accent' => $item->title_accent,
                ],
                'paragraphs' => collect($item->paragraphs ?? [])
                    ->map(fn (array $paragraph) => [
                        'text' => (string) ($paragraph['text'] ?? ''),
                        'emphasis' => (bool) ($paragraph['emphasis'] ?? false),
                    ])
                    ->filter(fn (array $paragraph) => $paragraph['text'] !== '')
                    ->values()
                    ->all(),
                'image' => StoredFileUrl::publicImage($item->photo_path),
                'imageAlt' => $item->image_alt,
                'sortOrder' => $item->sort_order,
            ]);

        return response()->json(['data' => $data]);
    }
}
