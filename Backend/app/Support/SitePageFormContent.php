<?php

namespace App\Support;

use App\Models\SitePage;

class SitePageFormContent
{
    /**
     * @return array{
     *     lead: string,
     *     currentPage: string,
     *     introBadge: string,
     *     introTitle: string,
     *     paragraphs: list<string>
     * }
     */
    public static function resolve(?SitePage $page): array
    {
        $content = is_array($page?->content) ? $page->content : [];

        return [
            'lead' => (string) ($content['lead'] ?? ''),
            'currentPage' => (string) ($content['currentPage'] ?? ''),
            'introBadge' => (string) ($content['introBadge'] ?? ''),
            'introTitle' => (string) ($content['introTitle'] ?? ''),
            'paragraphs' => self::paragraphsFromContent($content),
        ];
    }

    /**
     * @param  array<string, mixed>  $content
     * @return list<string>
     */
    public static function paragraphsFromContent(array $content): array
    {
        if (isset($content['paragraphs']) && is_array($content['paragraphs'])) {
            return collect($content['paragraphs'])
                ->filter(fn ($paragraph) => is_string($paragraph) && trim($paragraph) !== '')
                ->values()
                ->all();
        }

        $intro = $content['intro'] ?? null;

        if (is_array($intro) && isset($intro['paragraphs']) && is_array($intro['paragraphs'])) {
            return collect($intro['paragraphs'])
                ->filter(fn ($paragraph) => is_string($paragraph) && trim($paragraph) !== '')
                ->values()
                ->all();
        }

        return [];
    }
}
