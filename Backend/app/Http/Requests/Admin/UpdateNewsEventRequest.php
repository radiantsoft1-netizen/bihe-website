<?php

namespace App\Http\Requests\Admin;

use App\Models\NewsEvent;
use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class UpdateNewsEventRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        /** @var NewsEvent|null $newsEvent */
        $newsEvent = $this->route('news_event');

        return [
            'news_category_id' => ['nullable', 'exists:news_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('news_events', 'slug')->ignore($newsEvent?->id),
            ],
            'summary' => ['nullable', 'string'],
            'body' => ['nullable', 'string', 'max:50000'],
            'event_date' => ['nullable', 'date'],
            'image' => UploadedFileRules::image(),
            'image_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
            'pdf' => UploadedFileRules::pdf(),
            'pdf_library_path' => ['nullable', 'string', new MediaLibraryPath('pdf')],
            'published' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],
            'show_in_ticker' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:500'],
            'seo_keywords' => ['nullable', 'string', 'max:255'],
        ];
    }
}
