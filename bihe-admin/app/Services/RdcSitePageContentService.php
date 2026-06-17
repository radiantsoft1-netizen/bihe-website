<?php

namespace App\Services;

use App\Models\SitePage;
use App\Support\SitePageRdcDefaults;
use Illuminate\Http\Request;

class RdcSitePageContentService
{
    public const PAGE_PATH = '/research/research-and-development-cell';

    public function __construct(
        private RichHtmlSanitizer $richHtml,
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
    ) {
    }

    public function page(): SitePage
    {
        return SitePage::query()->firstOrCreate(
            ['path' => self::PAGE_PATH],
            [
                'slug' => 'research-and-development-cell',
                'section' => 'research',
                'template_key' => 'research-development-cell',
                'title' => 'Research and Development Cell',
                'meta_description' => 'Institutional R&D initiatives.',
                'content' => [],
                'sort_order' => 0,
                'published' => true,
            ],
        );
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    public function buildUpdatedContent(SitePage $sitePage, array $validated, ?Request $request = null): array
    {
        $content = is_array($sitePage->content) ? $sitePage->content : [];
        $content['title'] = $sitePage->title;

        if (isset($validated['projects']) && is_array($validated['projects'])) {
            $content['projects'] = $this->normalizeProjects(
                $validated['projects'],
                $content,
                $request,
            );
        }

        return $this->richHtml->cleanContentArray($content);
    }

    /**
     * @param  list<array<string, mixed>>  $projects
     * @param  array<string, mixed>  $content
     * @return list<array<string, mixed>>
     */
    private function normalizeProjects(array $projects, array $content, ?Request $request = null): array
    {
        $existingProjects = collect(is_array($content['projects'] ?? null) ? $content['projects'] : [])
            ->keyBy('id');

        return collect($projects)
            ->filter(fn ($project) => is_array($project) && ! empty($project['id']))
            ->values()
            ->map(function (array $project, int $index) use ($request, $existingProjects): array {
                $existingProject = $existingProjects->get($project['id'], []);
                $existingImages = is_array($existingProject['images'] ?? null) ? $existingProject['images'] : [];
                $submittedImages = is_array($project['images'] ?? null) ? $project['images'] : [];
                $images = [];

                for ($imageIndex = 0; $imageIndex < 2; $imageIndex++) {
                    $submittedImage = is_array($submittedImages[$imageIndex] ?? null) ? $submittedImages[$imageIndex] : [];
                    $existingImage = is_array($existingImages[$imageIndex] ?? null) ? $existingImages[$imageIndex] : [];
                    $path = (string) ($submittedImage['path'] ?? $existingImage['path'] ?? '');

                    if ($request?->hasFile("projects.{$index}.images.{$imageIndex}.file")) {
                        if ($path !== '') {
                            $this->uploads->delete($path);
                        }

                        $upload = $this->uploads->store(
                            $request->file("projects.{$index}.images.{$imageIndex}.file"),
                            'image',
                            config('uploads.directories.rdc_project'),
                        );
                        $path = $upload->path;
                    } elseif ($request?->filled("projects.{$index}.images.{$imageIndex}.file_library_path")) {
                        $libraryPath = trim((string) $request->input("projects.{$index}.images.{$imageIndex}.file_library_path"));

                        if ($libraryPath !== '' && $this->mediaLibrary->validatePath($libraryPath, 'image')) {
                            if ($path !== '' && $path !== $libraryPath) {
                                $this->uploads->delete($path);
                            }

                            $path = $libraryPath;
                        }
                    }

                    $image = [
                        'alt' => trim((string) ($submittedImage['alt'] ?? $existingImage['alt'] ?? '')),
                    ];

                    if ($path !== '') {
                        $image['path'] = $path;
                    }

                    $images[] = $image;
                }

                return [
                    'id' => (string) $project['id'],
                    'title' => trim((string) ($project['title'] ?? '')),
                    'category' => trim((string) ($project['category'] ?? '')),
                    'aim' => $this->richHtml->clean((string) ($project['aim'] ?? '')),
                    'conclusion' => $this->richHtml->clean((string) ($project['conclusion'] ?? '')),
                    'images' => $images,
                ];
            })
            ->filter(function (array $project): bool {
                return $project['title'] !== ''
                    || $project['category'] !== ''
                    || $project['aim'] !== ''
                    || $project['conclusion'] !== ''
                    || collect($project['images'])->contains(fn (array $image) => ! empty($image['path']));
            })
            ->values()
            ->all();
    }

    public function seedDefaultProjectsIfEmpty(SitePage $sitePage): void
    {
        $content = is_array($sitePage->content) ? $sitePage->content : [];

        if (! empty($content['projects']) && is_array($content['projects'])) {
            return;
        }

        $content['projects'] = collect(SitePageRdcDefaults::projects())
            ->map(fn (array $project) => [
                'id' => $project['id'],
                'title' => $project['title'],
                'category' => $project['category'],
                'aim' => $project['aim'],
                'conclusion' => $project['conclusion'],
            ])
            ->all();

        $sitePage->update(['content' => $content]);
    }
}
