<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\GalleryMedia;
use App\Services\SecureFileUploadService;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GalleryMediaController extends Controller
{
    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function preview(GalleryMedia $galleryMedia): StreamedResponse|Response
    {
        if (! $galleryMedia->isImage() || ! $galleryMedia->image_path) {
            abort(404);
        }

        $galleryMedia->loadMissing('album');

        if (! $galleryMedia->album || ! $galleryMedia->album->published) {
            abort(404);
        }

        $disk = $this->uploads->resolveDisk($galleryMedia->image_path);
        if (! $disk) {
            abort(404);
        }

        return $this->uploads->stream(
            $galleryMedia->image_path,
            $disk,
            'bihe-gallery-'.$galleryMedia->id.'.jpg',
            'inline',
        );
    }
}
