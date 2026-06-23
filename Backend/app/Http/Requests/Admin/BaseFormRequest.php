<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Concerns\SanitizesInput;
use Illuminate\Foundation\Http\FormRequest;

abstract class BaseFormRequest extends FormRequest
{
    use SanitizesInput;

    /** @return array<string, string> */
    public function messages(): array
    {
        $maxUpload = ini_get('upload_max_filesize') ?: 'unknown';
        $appMaxKb = (int) config('uploads.types.image.max_size_kb', 5120);

        $pdfMaxMb = round((int) config('uploads.types.pdf.max_size_kb', 20480) / 1024);

        return [
            'image.uploaded' => "The image failed to upload. Your file may exceed the server limit ({$maxUpload}). Use JPG/PNG/WebP under {$appMaxKb} KB, or restart the dev server with `composer serve` (20 MB limit).",
            'logo.uploaded' => "The logo failed to upload. Your file may exceed the server limit ({$maxUpload}).",
            'photo.uploaded' => "The photo failed to upload. Your file may exceed the server limit ({$maxUpload}).",
            'images.*.uploaded' => "An image failed to upload. Your file may exceed the server limit ({$maxUpload}).",
            'pdf.uploaded' => "The PDF failed to upload. Your file may exceed the server limit ({$maxUpload}). Use a PDF under {$pdfMaxMb} MB, or restart the dev server with `composer serve` (20 MB limit).",
        ];
    }
}
