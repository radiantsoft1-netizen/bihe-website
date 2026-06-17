<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StoreInfoCornerItemRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'category_ids' => ['required', 'array', 'min:1'],
            'category_ids.*' => ['integer', 'exists:info_corner_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'badge_text' => ['nullable', 'string', 'max:30'],
            'badge_visible' => ['sometimes', 'boolean'],
            'slug' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'body' => ['nullable', 'string', 'max:50000'],
            'image_alt' => ['nullable', 'string', 'max:500'],
            'external_link' => ['nullable', 'url', 'max:500'],
            'published_date' => ['nullable', 'date'],
            'images' => UploadedFileRules::images(),
            'images.*' => UploadedFileRules::image(),
            'image_library_paths' => ['nullable', 'array'],
            'image_library_paths.*' => ['nullable', 'string', new MediaLibraryPath('image')],
            'keep_image_ids' => ['nullable', 'array'],
            'keep_image_ids.*' => ['integer', 'exists:info_corner_item_images,id'],
            'pdf' => UploadedFileRules::pdf(),
            'pdf_library_path' => ['nullable', 'string', new MediaLibraryPath('pdf')],
            'show_in_home_scroller' => ['sometimes', 'boolean'],
            'published' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
