<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateResearchDevelopmentCellRequest;
use App\Services\RdcSitePageContentService;
use App\Services\WebsiteRevalidationService;

class ResearchDevelopmentCellController extends Controller
{
    public function __construct(
        private RdcSitePageContentService $rdcContent,
        private WebsiteRevalidationService $revalidation,
    ) {
    }

    public function edit()
    {
        $sitePage = $this->rdcContent->page();
        $this->rdcContent->seedDefaultProjectsIfEmpty($sitePage);
        $sitePage->refresh();

        return view('admin.research-development-cell.edit', compact('sitePage'));
    }

    public function update(UpdateResearchDevelopmentCellRequest $request)
    {
        $sitePage = $this->rdcContent->page();
        $content = $this->rdcContent->buildUpdatedContent($sitePage, $request->validated(), $request);

        $sitePage->update(['content' => $content]);
        $this->revalidation->revalidateForResource('site-pages');

        return redirect()
            ->route('admin.research-development-cell.edit')
            ->with('success', 'Research & Development Cell content updated successfully.');
    }
}
