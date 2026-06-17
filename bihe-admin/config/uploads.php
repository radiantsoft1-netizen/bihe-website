<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Upload type definitions
    |--------------------------------------------------------------------------
    |
    | Each type defines allowed MIME types, extensions, max size (KB), storage
    | disk, and magic-byte signatures used for content validation.
    |
    */

    'types' => [
        'image' => [
            'disk' => 'public',
            'max_size_kb' => (int) env('UPLOAD_IMAGE_MAX_KB', 20480),
            'mimes' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            'extensions' => ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            'magic' => [
                'image/jpeg' => ["\xFF\xD8\xFF"],
                'image/png' => ["\x89PNG\r\n\x1a\n"],
                'image/gif' => ["GIF87a", "GIF89a"],
                'image/webp' => ['RIFF'],
            ],
            'strip_metadata' => true,
        ],
        'pdf' => [
            'disk' => 'uploads',
            'max_size_kb' => (int) env('UPLOAD_PDF_MAX_KB', 20480),
            'mimes' => ['application/pdf'],
            'extensions' => ['pdf'],
            'magic' => [
                'application/pdf' => ['%PDF'],
            ],
            'strip_metadata' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Storage directories (relative to disk root)
    |--------------------------------------------------------------------------
    */

    'directories' => [
        'faculty_photo' => 'faculty/photos',
        'faculty_resume' => 'faculty/resumes',
        'news_image' => 'news/images',
        'news_pdf' => 'news/pdfs',
        'circular_notice_image' => 'circular-notices/images',
        'circular_notice_pdf' => 'circular-notices/pdfs',
        'prospectus_pdf' => 'settings/prospectus',
        'placement_drive_image' => 'placement-drives/images',
        'info_corner_image' => 'info-corner/images',
        'info_corner_pdf' => 'info-corner/pdfs',
        'gallery' => 'gallery',
        'document' => 'documents',
        'hero_banner' => 'hero-banners',
        'recruiting_partner' => 'recruiting-partners',
        'governing_body' => 'governing-bodies',
        'rich_text' => 'rich-text',
        'rdc_project' => 'rdc/projects',

        // Future Phase — @see docs/FUTURE-PHASES.md, config/modules.php
        'download_file' => 'downloads',
        'alumni_photo' => 'alumni/photos',
        'alumni_event_image' => 'alumni/events',
        'student_document' => 'student/documents',
        'admission_document' => 'admissions/documents',
        'admission_photo' => 'admissions/photos',
        'company_logo' => 'placement/companies',
        'placement_document' => 'placement/documents',
    ],

];
