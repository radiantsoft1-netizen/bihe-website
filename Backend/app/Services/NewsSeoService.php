<?php

namespace App\Services;

use App\Models\NewsEvent;
use Illuminate\Support\Str;

class NewsSeoService
{
    public function apply(NewsEvent $newsEvent): void
    {
        $categoryName = $newsEvent->category?->name;

        if (blank($newsEvent->seo_title)) {
            $newsEvent->seo_title = Str::limit($newsEvent->title, 70, '');
        }

        if (blank($newsEvent->seo_description)) {
            $source = $newsEvent->summary ?: strip_tags((string) $newsEvent->body);
            $newsEvent->seo_description = Str::limit(trim(preg_replace('/\s+/', ' ', $source) ?? ''), 160, '…');
        }

        if (blank($newsEvent->seo_keywords)) {
            $keywords = collect([$categoryName, $newsEvent->title, 'BIHE', 'Davangere'])
                ->filter()
                ->map(fn (string $value) => Str::lower($value))
                ->unique()
                ->take(8)
                ->implode(', ');

            $newsEvent->seo_keywords = $keywords;
        }
    }
}
