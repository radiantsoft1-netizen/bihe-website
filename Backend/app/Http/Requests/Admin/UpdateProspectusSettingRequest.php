<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;

class UpdateProspectusSettingRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:120'],
            'pdf' => UploadedFileRules::pdf(),
            'pdf_library_path' => ['nullable', 'string', new MediaLibraryPath('pdf')],
            'enabled' => ['sometimes', 'boolean'],
        ];
    }
}
