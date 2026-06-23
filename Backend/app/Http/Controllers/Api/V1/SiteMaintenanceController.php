<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\SiteMaintenanceService;
use Illuminate\Http\JsonResponse;

class SiteMaintenanceController extends Controller
{
    public function __construct(
        private SiteMaintenanceService $maintenance,
    ) {
    }

    public function show(): JsonResponse
    {
        return response()->json([
            'data' => $this->maintenance->publicPayload(),
        ]);
    }
}
