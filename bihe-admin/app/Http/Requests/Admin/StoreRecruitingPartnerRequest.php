<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;

class StoreRecruitingPartnerRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'logo' => UploadedFileRules::image(),
            'logo_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
            'active' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            if (! $this->hasFile('logo') && ! $this->filled('logo_library_path')) {
                $validator->errors()->add('logo', 'Please choose a logo from the media library or upload one from your computer.');
            }
        });
    }
}
