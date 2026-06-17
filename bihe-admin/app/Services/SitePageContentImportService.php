<?php

namespace App\Services;

use App\Models\SitePage;
use App\Support\SitePageFormContent;
use App\Support\SitePageRdcDefaults;

class SitePageContentImportService
{
    public function importPage(SitePage $page, bool $refreshParagraphs = false): bool
    {
        $catalog = $this->catalog();
        $incoming = $catalog[$page->path] ?? null;

        if (! is_array($incoming)) {
            return false;
        }

        if (! $refreshParagraphs && $this->hasEditableContent($page->content ?? [])) {
            return false;
        }

        $page->update([
            'content' => $this->mergeContent($page->content ?? [], $incoming),
        ]);

        return true;
    }

    public function hasImportDefaults(string $path): bool
    {
        return is_array($this->catalog()[$path] ?? null);
    }

    public function import(bool $onlyEmpty = true, bool $refreshParagraphs = false): int
    {
        $catalog = $this->catalog();

        if ($catalog === []) {
            return 0;
        }

        $updated = 0;

        foreach ($catalog as $path => $content) {
            $page = SitePage::query()->where('path', $path)->first();

            if (! $page || ! is_array($content)) {
                continue;
            }

            if ($onlyEmpty && ! $refreshParagraphs && $this->hasEditableContent($page->content ?? [])) {
                continue;
            }

            $page->update([
                'content' => $this->mergeContent($page->content ?? [], $content),
            ]);

            $updated++;
        }

        return $updated;
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    private function catalog(): array
    {
        $path = database_path('data/site-page-content.json');

        if (! is_file($path)) {
            return [];
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param  array<string, mixed>  $content
     */
    private function hasEditableContent(array $content): bool
    {
        if (SitePageFormContent::paragraphsFromContent($content) !== []) {
            return true;
        }

        if (! empty($content['projects']) && is_array($content['projects'])) {
            return true;
        }

        foreach (['currentPage', 'introBadge', 'introTitle'] as $key) {
            if (trim((string) ($content[$key] ?? '')) !== '') {
                return true;
            }
        }

        return false;
    }

    public function importRdcProjects(): int
    {
        $page = SitePage::query()
            ->where('path', '/research/research-and-development-cell')
            ->first();

        if (! $page) {
            return 0;
        }

        $content = is_array($page->content) ? $page->content : [];

        if (! empty($content['projects']) && is_array($content['projects'])) {
            return 0;
        }
        $content['projects'] = collect(SitePageRdcDefaults::projects())
            ->map(fn (array $project) => [
                'id' => $project['id'],
                'aim' => $project['aim'],
                'conclusion' => $project['conclusion'],
            ])
            ->all();

        $page->update(['content' => $content]);

        return 1;
    }

    /**
     * @param  array<string, mixed>  $existing
     * @param  array<string, mixed>  $incoming
     * @return array<string, mixed>
     */
    private function mergeContent(array $existing, array $incoming): array
    {
        $merged = $existing;

        foreach (['title', 'lead', 'currentPage', 'introBadge', 'introTitle'] as $key) {
            if (! empty($incoming[$key]) && is_string($incoming[$key])) {
                $merged[$key] = $incoming[$key];
            }
        }

        if (! empty($incoming['paragraphs']) && is_array($incoming['paragraphs'])) {
            $merged['paragraphs'] = collect($incoming['paragraphs'])
                ->filter(fn ($paragraph) => is_string($paragraph) && trim($paragraph) !== '')
                ->values()
                ->all();
        }

        if (! empty($incoming['projects']) && is_array($incoming['projects'])) {
            $merged['projects'] = collect($incoming['projects'])
                ->filter(fn ($project) => is_array($project) && ! empty($project['id']))
                ->map(fn (array $project) => [
                    'id' => (string) $project['id'],
                    'aim' => (string) ($project['aim'] ?? ''),
                    'conclusion' => (string) ($project['conclusion'] ?? ''),
                ])
                ->values()
                ->all();
        }

        return $merged;
    }
}
