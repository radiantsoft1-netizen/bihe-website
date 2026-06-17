<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;

class StoreHeroBannerRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'eyebrow' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'image' => UploadedFileRules::image(),
            'image_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
            'active' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            if (! $this->hasFile('image') && ! $this->filled('image_library_path')) {
                $validator->errors()->add('image', 'Please choose a background image from the media library or upload one from your computer.');
            }
        });
    }
}
