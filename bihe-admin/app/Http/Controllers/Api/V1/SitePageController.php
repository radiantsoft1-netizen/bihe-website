<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SitePage;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SitePageController extends Controller
{
    public function index(): JsonResponse
    {
        $data = SitePage::published()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (SitePage $page) => $this->transformPage($page));

        return response()->json(['data' => $data]);
    }

    public function show(Request $request): JsonResponse
    {
        $path = '/'.ltrim((string) $request->query('path', ''), '/');
        if ($path === '/') {
            $path = '/';
        }

        $page = SitePage::published()->where('path', $path)->first();

        if (! $page) {
            return response()->json(['message' => 'Page not found.'], 404);
        }

        return response()->json(['data' => $this->transformPage($page)]);
    }

    /** @return array<string, mixed> */
    private function transformPage(SitePage $page): array
    {
        $content = $page->content ?? [];

        if ($page->template_key === 'research-development-cell' && is_array($content['projects'] ?? null)) {
            $content['projects'] = collect($content['projects'])
                ->map(function (array $project): array {
                    if (! is_array($project['images'] ?? null)) {
                        return $project;
                    }

                    $project['images'] = collect($project['images'])
                        ->map(function (array $image): array {
                            if (! empty($image['path'])) {
                                $image['src'] = StoredFileUrl::publicImage($image['path']);
                            }

                            return $image;
                        })
                        ->values()
                        ->all();

                    return $project;
                })
                ->values()
                ->all();
        }

        return [
            'path' => $page->path,
            'slug' => $page->slug,
            'section' => $page->section,
            'templateKey' => $page->template_key,
            'title' => $page->title,
            'metaDescription' => $page->meta_description,
            'content' => $content,
            'sortOrder' => $page->sort_order,
        ];
    }
}
