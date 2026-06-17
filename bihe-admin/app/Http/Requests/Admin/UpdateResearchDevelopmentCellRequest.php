<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;

class UpdateResearchDevelopmentCellRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'projects' => ['nullable', 'array'],
            'projects.*.id' => ['required_with:projects', 'string', 'max:120'],
            'projects.*.title' => ['nullable', 'string', 'max:255'],
            'projects.*.category' => ['nullable', 'string', 'max:120'],
            'projects.*.aim' => ['nullable', 'string', 'max:20000'],
            'projects.*.conclusion' => ['nullable', 'string', 'max:20000'],
            'projects.*.images' => ['nullable', 'array', 'max:2'],
            'projects.*.images.*.path' => ['nullable', 'string', 'max:500'],
            'projects.*.images.*.alt' => ['nullable', 'string', 'max:255'],
            'projects.*.images.*.file' => UploadedFileRules::image(),
            'projects.*.images.*.file_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
        ];
    }
}
