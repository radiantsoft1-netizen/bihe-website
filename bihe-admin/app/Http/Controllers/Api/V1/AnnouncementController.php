<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;

class AnnouncementController extends Controller
{
    public function index(): JsonResponse
    {
        $data = Announcement::active()
            ->latest()
            ->get()
            ->map(fn ($item) => [
                'id' => (string) $item->id,
                'message' => trim(strip_tags((string) $item->message)),
                'link' => $item->link,
                'active' => $item->active,
            ]);

        return response()->json(['data' => $data]);
    }
}
