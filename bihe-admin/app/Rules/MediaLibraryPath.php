<?php

namespace App\Rules;

use App\Services\MediaLibraryService;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MediaLibraryPath implements ValidationRule
{
    public function __construct(private string $type)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null || $value === '') {
            return;
        }

        if (! is_string($value)) {
            $fail('The selected media is invalid.');

            return;
        }

        $library = app(MediaLibraryService::class);

        if (! $library->validatePath($value, $this->type)) {
            $fail('The selected media file could not be found.');
        }
    }
}
