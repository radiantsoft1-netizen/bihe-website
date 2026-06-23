<?php

namespace App\Support;

use App\Services\SecureFileUploadService;

class StoredFileUrl
{
    public static function encodeStorageSegments(string $path): string
    {
        return collect(explode('/', str_replace('\\', '/', $path)))
            ->reject(fn (string $segment) => $segment === '')
            ->map(fn (string $segment) => rawurlencode(rawurldecode($segment)))
            ->implode('/');
    }

    public static function publicStoragePath(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return '/storage/'.self::encodeStorageSegments($path);
    }

    public static function publicImage(?string $path): ?string
    {
        return self::publicStoragePath($path);
    }

    /**
     * Same as publicImage but uses SecureFileUploadService disk resolution.
     */
    public static function publicImageFromDisk(?string $path, ?string $disk = null): ?string
    {
        if (! $path) {
            return null;
        }

        return app(SecureFileUploadService::class)->publicUrl($path, $disk);
    }

    public static function documentFile(int|string $id): string
    {
        return url('/api/v1/documents/'.$id.'/file');
    }

    public static function infoCornerItemPdf(string $categorySlug, string $slug): string
    {
        return url('/api/v1/info-corner/items/'.$categorySlug.'/'.$slug.'/pdf');
    }

    public static function circularNoticePdf(string $slug): string
    {
        return url('/api/v1/circular-notices/'.$slug.'/pdf');
    }

    public static function newsPdf(string $slug): string
    {
        return url('/api/v1/news/'.$slug.'/pdf');
    }

    public static function facultyResume(int|string $id): string
    {
        return url('/api/v1/faculty/'.$id.'/resume');
    }
}
