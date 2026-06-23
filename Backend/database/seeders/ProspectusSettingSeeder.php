<?php

namespace Database\Seeders;

use App\Services\ProspectusSettingService;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;

class ProspectusSettingSeeder extends Seeder
{
    public function run(): void
    {
        $source = base_path('../public/documents/bihe-prospectus.pdf');

        if (! is_file($source)) {
            return;
        }

        $upload = new UploadedFile(
            $source,
            'bihe-prospectus.pdf',
            'application/pdf',
            null,
            true,
        );

        app(ProspectusSettingService::class)->seedDefaultPdf($upload);
    }
}
