<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CircularNotice;
use App\Models\InfoCornerItem;
use App\Models\Document;
use App\Models\Faculty;
use App\Models\NewsEvent;
use App\Services\SecureFileUploadService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class StoredFileController extends Controller
{
    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function document(Document $document): StreamedResponse
    {
        if (! $document->file_path) {
            abort(404);
        }

        return $this->uploads->stream(
            $document->file_path,
            null,
            $document->file_name ?: 'document.pdf',
            'inline',
            'application/pdf',
        );
    }

    public function infoCornerItemPdf(InfoCornerItem $infoCornerItem): StreamedResponse
    {
        if (! $infoCornerItem->pdf_path) {
            abort(404);
        }

        return $this->uploads->stream(
            $infoCornerItem->pdf_path,
            null,
            $infoCornerItem->pdf_name ?: 'document.pdf',
            'inline',
            'application/pdf',
        );
    }

    public function circularNoticePdf(CircularNotice $circularNotice): StreamedResponse
    {
        if (! $circularNotice->pdf_path) {
            abort(404);
        }

        return $this->uploads->stream(
            $circularNotice->pdf_path,
            null,
            $circularNotice->pdf_name ?: 'notice.pdf',
            'inline',
            'application/pdf',
        );
    }

    public function newsPdf(NewsEvent $newsEvent): StreamedResponse
    {
        if (! $newsEvent->pdf_path) {
            abort(404);
        }

        return $this->uploads->stream(
            $newsEvent->pdf_path,
            null,
            $newsEvent->pdf_name ?: 'news.pdf',
            'inline',
            'application/pdf',
        );
    }

    public function facultyResume(Faculty $faculty): StreamedResponse
    {
        if (! $faculty->resume_path) {
            abort(404);
        }

        return $this->uploads->stream(
            $faculty->resume_path,
            null,
            $faculty->resume_name ?: 'faculty-profile.pdf',
            'inline',
            'application/pdf',
        );
    }
}
