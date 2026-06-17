<?php

namespace App\Console\Commands;

use App\Services\SitePageContentImportService;
use Illuminate\Console\Command;

class ImportSitePageContentCommand extends Command
{
    protected $signature = 'site-pages:import-content {--force : Overwrite pages that already have CMS content} {--refresh-paragraphs : Re-import paragraph text from the website defaults}';

    protected $description = 'Import default website page copy into site_pages.content for the admin editor';

    public function handle(SitePageContentImportService $import): int
    {
        $updated = $import->import(
            onlyEmpty: ! $this->option('force'),
            refreshParagraphs: (bool) $this->option('refresh-paragraphs'),
        );
        $rdcUpdated = $import->importRdcProjects();

        $this->info("Updated {$updated} site page(s) with default content.");

        if ($rdcUpdated > 0) {
            $this->info('Imported Research & Development Cell project content.');
        }

        return self::SUCCESS;
    }
}
