<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ProspectusSettingService;
use App\Services\SecureFileUploadService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProspectusSettingController extends Controller
{
    public function __construct(
        private ProspectusSettingService $prospectus,
        private SecureFileUploadService $uploads,
    ) {
    }

    public function show(): JsonResponse
    {
        $payload = $this->prospectus->publicPayload();

        return response()->json(['data' => $payload]);
    }

    public function pdf(): StreamedResponse
    {
        $setting = $this->prospectus->get();

        if (! ($setting['enabled'] ?? true) || empty($setting['file_path'])) {
            abort(404);
        }

        if (! $this->uploads->resolveDisk($setting['file_path'])) {
            abort(404);
        }

        return $this->uploads->stream(
            $setting['file_path'],
            null,
            $setting['file_name'] ?: 'prospectus.pdf',
            'inline',
            'application/pdf',
        );
    }
}
