<?php

namespace App\Support;

use App\Services\SecureFileUploadService;

class StoredFileUrl
{
    public static function publicImage(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return app(SecureFileUploadService::class)->publicUrl($path);
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
