<?php

namespace App\Rules;

use App\Services\SecureFileUploadService;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;

class SecureUploadRule implements ValidationRule
{
    public function __construct(private readonly string $type)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null) {
            return;
        }

        if (! $value instanceof UploadedFile) {
            $fail('The :attribute must be a valid file upload.');

            return;
        }

        if (! $value->isValid()) {
            $fail($this->describeUploadError($value));

            return;
        }

        try {
            app(SecureFileUploadService::class)->validateFile($value, $this->type);
        } catch (ValidationException $exception) {
            $message = collect($exception->errors())->flatten()->first()
                ?: 'The uploaded file is not allowed.';

            $fail($message);
        }
    }

    protected function describeUploadError(UploadedFile $file): string
    {
        $maxUpload = ini_get('upload_max_filesize') ?: 'unknown';
        $maxPost = ini_get('post_max_size') ?: 'unknown';
        $fileKind = $this->type === 'pdf' ? 'PDF' : 'image';
        $restartHint = $maxUpload !== '20M'
            ? ' Restart the dev server with `composer serve` (20 MB limit).'
            : '';

        return match ($file->getError()) {
            UPLOAD_ERR_INI_SIZE => "The file exceeds the server upload limit ({$maxUpload}). Use a smaller {$fileKind} or increase PHP upload_max_filesize.{$restartHint}",
            UPLOAD_ERR_FORM_SIZE => 'The file exceeds the maximum allowed size for this form.',
            UPLOAD_ERR_PARTIAL => 'The file was only partially uploaded. Please try again.',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
            UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE, UPLOAD_ERR_EXTENSION => 'The server could not store the uploaded file. Check storage permissions.',
            default => "The file failed to upload. Please try a smaller {$fileKind} (max {$maxUpload}, post {$maxPost}).{$restartHint}",
        };
    }
}
