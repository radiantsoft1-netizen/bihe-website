<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StoreGalleryAlbumRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'gallery_category_id' => ['nullable', 'exists:gallery_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('gallery_albums', 'slug')],
            'description' => ['nullable', 'string'],
            'published' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'featured_media_id' => ['nullable', 'exists:gallery_media,id'],
            'images' => ['nullable', 'array'],
            'images.*' => UploadedFileRules::image(required: true),
            'image_library_paths' => ['nullable', 'array'],
            'image_library_paths.*' => ['nullable', 'string', new MediaLibraryPath('image')],
            'keep_image_ids' => ['nullable', 'array'],
            'keep_image_ids.*' => ['integer'],
            'youtube_url' => ['nullable', 'url', 'max:500'],
            'youtube_title' => ['nullable', 'string', 'max:255'],
            'media_order' => ['nullable', 'array'],
            'media_order.*' => ['integer'],
        ];
    }
}
