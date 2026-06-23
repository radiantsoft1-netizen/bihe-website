<?php

namespace App\Http\Requests\Admin;

use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StorePlacementDriveRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('placement_drives', 'slug')],
            'eyebrow' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'hero_lead' => ['nullable', 'string', 'max:2000'],
            'event_date' => ['nullable', 'date'],
            'date_label' => ['nullable', 'string', 'max:32'],
            'year_label' => ['nullable', 'string', 'max:8'],
            'intro_body' => ['nullable', 'string', 'max:50000'],
            'section2_title' => ['nullable', 'string', 'max:255'],
            'section2_body' => ['nullable', 'string', 'max:50000'],
            'images' => UploadedFileRules::images(),
            'images.*' => UploadedFileRules::image(),
            'gallery_library_paths' => ['nullable', 'array', 'max:12'],
            'gallery_library_paths.*' => ['nullable', 'string', 'max:500'],
            'keep_gallery_paths' => ['nullable', 'array', 'max:12'],
            'keep_gallery_paths.*' => ['nullable', 'string', 'max:500'],
            'published' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
