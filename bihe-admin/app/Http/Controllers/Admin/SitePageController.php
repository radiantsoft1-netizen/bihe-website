<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreSitePageRequest;
use App\Http\Requests\Admin\UpdateSitePageRequest;
use App\Models\SitePage;
use App\Services\RdcSitePageContentService;
use App\Services\RichHtmlSanitizer;
use App\Services\SitePageContentImportService;
use App\Services\WebsiteRevalidationService;
use App\Support\AdminPagination;
use App\Support\UniqueSlug;
use Illuminate\Http\Request;

class SitePageController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(
        private RichHtmlSanitizer $richHtml,
        private RdcSitePageContentService $rdcContent,
        private WebsiteRevalidationService $revalidation,
    ) {
    }

    public function index(Request $request)
    {
        $query = SitePage::query()->orderBy('path');

        if ($section = $request->query('section')) {
            $query->where('section', $section);
        }

        $sitePages = AdminPagination::paginate($query, $request, 15);
        $sections = SitePage::query()->distinct()->orderBy('section')->pluck('section');
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.site-pages.index', compact('sitePages', 'sections', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.site-pages.create');
    }

    public function store(StoreSitePageRequest $request)
    {
        $validated = $this->validatedAttributes($request->validated(), null, $request);
        $validated['published'] = $request->boolean('published');

        SitePage::create($validated);
        $this->revalidation->revalidateForResource('site-pages');

        return redirect()->route('admin.site-pages.index')
            ->with('success', 'Site page created successfully.');
    }

    public function edit(SitePage $sitePage)
    {
        return view('admin.site-pages.edit', compact('sitePage'));
    }

    public function update(UpdateSitePageRequest $request, SitePage $sitePage)
    {
        $validated = $this->validatedAttributes($request->validated(), $sitePage, $request);
        $validated['published'] = $request->boolean('published');

        $sitePage->update($validated);
        $this->revalidation->revalidateForResource('site-pages');

        return redirect()->route('admin.site-pages.index')
            ->with('success', 'Site page updated successfully.');
    }

    public function destroy(SitePage $sitePage)
    {
        $sitePage->delete();

        return redirect()->route('admin.site-pages.index')
            ->with('success', 'Site page deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            SitePage::class,
            'admin.site-pages.index',
            fn (SitePage $sitePage) => $sitePage->delete(),
        );
    }

    public function importContent(SitePage $sitePage, SitePageContentImportService $import)
    {
        if (! $import->hasImportDefaults($sitePage->path)) {
            return redirect()->route('admin.site-pages.edit', $sitePage)
                ->with('error', 'No default website copy is available for this page path. Fill in the fields below or add it to the content export.');
        }

        if (! $import->importPage($sitePage, refreshParagraphs: true)) {
            return redirect()->route('admin.site-pages.edit', $sitePage)
                ->with('error', 'Website content could not be loaded for this page.');
        }

        if ($sitePage->template_key === 'research-development-cell') {
            $import->importRdcProjects();
        }

        $this->revalidation->revalidateForResource('site-pages');

        return redirect()->route('admin.site-pages.edit', $sitePage)
            ->with('success', 'Website content loaded into this page.');
    }

    public function importAllContent(SitePageContentImportService $import)
    {
        $updated = $import->import(onlyEmpty: false, refreshParagraphs: true);
        $rdcUpdated = $import->importRdcProjects();

        $this->revalidation->revalidateForResource('site-pages');

        $message = "Loaded default website content into {$updated} page(s).";

        if ($rdcUpdated > 0) {
            $message .= ' Research & Development project panels were refreshed.';
        }

        return redirect()->route('admin.site-pages.index')
            ->with('success', $message);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function validatedAttributes(
        array $validated,
        ?SitePage $existing = null,
        ?Request $request = null,
    ): array {
        $validated['path'] = '/'.trim((string) $validated['path'], '/');
        if ($validated['path'] !== '/') {
            $validated['path'] = rtrim($validated['path'], '/');
        }

        $validated['slug'] = UniqueSlug::forModel(
            SitePage::class,
            $validated['slug'] ?? null,
            trim($validated['path'], '/') ?: 'home',
            $existing?->id,
        );

        $content = is_array($existing?->content) ? $existing->content : [];
        $content['title'] = $validated['title'];

        $isRdcTemplate = ($validated['template_key'] ?? $existing?->template_key) === 'research-development-cell';

        $contentFieldMap = [
            'content_lead' => 'lead',
            'content_current_page' => 'currentPage',
            'content_intro_badge' => 'introBadge',
            'content_intro_title' => 'introTitle',
        ];

        foreach ($contentFieldMap as $input => $key) {
            if ($isRdcTemplate && $key === 'lead') {
                unset($validated[$input]);

                continue;
            }

            if (! array_key_exists($input, $validated)) {
                continue;
            }

            $value = trim((string) $validated[$input]);

            if ($key === 'lead') {
                $value = $this->richHtml->clean($value);
            }

            if ($value === '') {
                unset($content[$key]);
            } else {
                $content[$key] = $value;
            }

            unset($validated[$input]);
        }

        if (isset($validated['paragraphs'])) {
            $paragraphs = $this->richHtml->cleanParagraphList($validated['paragraphs']);

            if ($paragraphs === []) {
                unset($content['paragraphs']);
            } else {
                $content['paragraphs'] = $paragraphs;
            }

            unset($validated['paragraphs']);
        }

        if (($validated['template_key'] ?? $existing?->template_key) === 'research-development-cell') {
            unset($content['lead']);

            if (isset($validated['projects']) && is_array($validated['projects'])) {
                $mergedContent = $this->rdcContent->buildUpdatedContent(
                    $existing ?? new SitePage(['content' => $content, 'title' => $validated['title'] ?? '']),
                    ['projects' => $validated['projects']],
                    $request,
                );
                $content['projects'] = $mergedContent['projects'] ?? [];
            }
        }

        unset($validated['projects']);

        $validated['content'] = $this->richHtml->cleanContentArray($content);

        return $validated;
    }
}
