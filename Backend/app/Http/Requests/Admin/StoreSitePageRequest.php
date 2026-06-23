<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StoreSitePageRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'path' => ['required', 'string', 'max:512', Rule::unique('site_pages', 'path')],
            'slug' => ['nullable', 'string', 'max:120', 'alpha_dash'],
            'section' => ['nullable', 'string', 'max:64'],
            'template_key' => ['required', 'string', 'max:64'],
            'title' => ['required', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:512'],
            'content_lead' => ['nullable', 'string', 'max:2000'],
            'content_current_page' => ['nullable', 'string', 'max:255'],
            'content_intro_badge' => ['nullable', 'string', 'max:120'],
            'content_intro_title' => ['nullable', 'string', 'max:255'],
            'paragraphs' => ['nullable', 'array'],
            'paragraphs.*' => ['nullable', 'string', 'max:20000'],
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
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'published' => ['sometimes', 'boolean'],
        ];
    }
}
