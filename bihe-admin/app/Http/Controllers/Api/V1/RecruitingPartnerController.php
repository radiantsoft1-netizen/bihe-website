<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\RecruitingPartner;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;

class RecruitingPartnerController extends Controller
{
    public function index(): JsonResponse
    {
        $data = RecruitingPartner::active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($item) => [
                'id' => (string) $item->id,
                'name' => $item->name,
                'logo' => StoredFileUrl::publicImage($item->logo_path),
                'sortOrder' => $item->sort_order,
            ]);

        return response()->json(['data' => $data]);
    }
}
