<?php

namespace App\Http\Controllers;

use App\Support\StoredFileUrl;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PublicStorageController extends Controller
{
    /**
     * Fallback when public/storage symlink is missing on shared hosting.
     */
    public function show(string $path): Response
    {
        if ($path === '' || str_contains($path, '..')) {
            abort(404);
        }

        $decodedPath = collect(explode('/', $path))
            ->reject(fn (string $segment) => $segment === '')
            ->map(fn (string $segment) => rawurldecode($segment))
            ->implode('/');

        if (! Storage::disk('public')->exists($decodedPath)) {
            abort(404);
        }

        $fullPath = Storage::disk('public')->path($decodedPath);
        $mime = Storage::disk('public')->mimeType($decodedPath) ?: 'application/octet-stream';

        return response()->file($fullPath, [
            'Content-Type' => $mime,
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
