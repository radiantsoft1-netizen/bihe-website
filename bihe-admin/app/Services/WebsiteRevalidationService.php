<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WebsiteRevalidationService
{
    /** @return list<string> */
    public function pathsForResource(string $resource): array
    {
        return match ($resource) {
            'hero-banners', 'announcements', 'recruiting-partners' => ['/'],
            'news-events', 'news-categories' => ['/', '/news'],
            'circular-notices' => [
                '/info-corner/circulars-and-notices',
                '/info-corner/circulars-and-notices/*',
            ],
            'placement-drives' => [
                '/student-life/placement-cell-and-activities',
                '/student-life/placement-cell-and-activities/*',
            ],
            'alumni-profiles', 'alumni-events' => [
                '/alumni',
                '/alumni/*',
            ],
            'info-corner', 'info-corner-items', 'info-corner-categories' => [
                '/',
                '/info-corner',
                '/info-corner/*',
            ],
            'faculty' => [
                '/academics/faculty-and-staff',
                '/academics/b-com-faculty',
                '/academics/bca-faculty',
                '/academics/non-teaching-staff',
                '/academics/bca',
                '/academics/b-com',
            ],
            'gallery', 'gallery-categories', 'gallery-media' => ['/', '/gallery'],
            'governing-bodies' => ['/governing-bodies'],
            'menu-items', 'navigation' => ['/', '/governing-bodies'],
            'prospectus-settings' => ['/'],
            'site-pages' => ['/'],
            'documents' => [],
            default => [],
        };
    }

    /** @return list<string> */
    public function tagsForResource(string $resource): array
    {
        return match ($resource) {
            'announcements' => ['api:/api/v1/announcements'],
            'hero-banners' => ['api:/api/v1/hero-banners'],
            'recruiting-partners' => ['api:/api/v1/recruiting-partners'],
            'news-events' => ['api:/api/v1/news', 'api:/api/v1/news/ticker'],
            'circular-notices' => ['api:/api/v1/circular-notices'],
            'placement-drives' => ['api:/api/v1/placement-drives'],
            'alumni-profiles' => ['api:/api/v1/alumni-profiles'],
            'alumni-events' => ['api:/api/v1/alumni-events'],
            'info-corner', 'info-corner-items', 'info-corner-categories' => [
                'api:/api/v1/info-corner/categories',
                'api:/api/v1/info-corner/items',
                'api:/api/v1/info-corner/items/home-scroller',
                'api:/api/v1/navigation',
            ],
            'news-categories' => ['api:/api/v1/news-categories', 'api:/api/v1/news'],
            'faculty' => ['api:/api/v1/faculty', 'api:/api/v1/faculty/sections'],
            'gallery', 'gallery-media' => ['api:/api/v1/gallery', 'api:/api/v1/gallery-albums'],
            'gallery-categories' => ['api:/api/v1/gallery-categories', 'api:/api/v1/gallery-albums'],
            'documents' => ['api:/api/v1/documents'],
            'governing-bodies' => ['api:/api/v1/governing-bodies'],
            'menu-items', 'navigation' => ['api:/api/v1/navigation'],
            'prospectus-settings' => ['api:/api/v1/site-settings/prospectus', 'api:/api/v1/navigation'],
            'site-pages' => ['api:/api/v1/site-pages'],
            default => [],
        };
    }

    public function revalidateForResource(string $resource): void
    {
        $this->revalidate(
            $this->pathsForResource($resource),
            $this->tagsForResource($resource),
        );
    }

    /**
     * @param  list<string>  $paths
     * @param  list<string>  $tags
     */
    public function revalidate(array $paths, array $tags = []): void
    {
        if ($paths === [] && $tags === []) {
            return;
        }

        $baseUrl = config('website.nextjs_url');
        $secret = config('website.revalidate_secret');

        if (! $baseUrl || ! $secret) {
            return;
        }

        try {
            $response = Http::timeout(3)->post($baseUrl.'/api/revalidate', [
                'secret' => $secret,
                'paths' => $paths,
                'tags' => $tags,
            ]);

            if (! $response->successful()) {
                Log::warning('Website revalidation failed', [
                    'status' => $response->status(),
                    'paths' => $paths,
                    'tags' => $tags,
                ]);
            }
        } catch (\Throwable $exception) {
            Log::warning('Website revalidation unreachable', [
                'message' => $exception->getMessage(),
                'paths' => $paths,
                'tags' => $tags,
            ]);
        }
    }
}
