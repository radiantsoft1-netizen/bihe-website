<?php

namespace App\Http\Requests\Admin;

use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StoreGoverningBodyRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'slug' => ['nullable', 'string', 'max:120', 'alpha_dash', Rule::unique('governing_bodies', 'slug')],
            'name' => ['required', 'string', 'max:255'],
            'title_line' => ['required', 'string', 'max:255'],
            'qualifications' => ['required', 'string', 'max:255'],
            'badge' => ['required', 'string', 'max:255'],
            'title_lead' => ['required', 'string', 'max:500'],
            'title_accent' => ['required', 'string', 'max:500'],
            'paragraphs' => ['required', 'array', 'min:1'],
            'paragraphs.*.text' => ['nullable', 'string', 'max:20000'],
            'paragraphs.*.emphasis' => ['sometimes', 'boolean'],
            'photo' => UploadedFileRules::image(),
            'photo_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
            'image_alt' => ['required', 'string', 'max:255'],
            'reverse_layout' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'published' => ['sometimes', 'boolean'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            $paragraphs = collect($this->input('paragraphs', []))
                ->map(fn (array $paragraph) => trim((string) ($paragraph['text'] ?? '')))
                ->filter(fn (string $text) => $text !== '');

            if ($paragraphs->isEmpty()) {
                $validator->errors()->add('paragraphs', 'At least one paragraph is required.');
            }

            if (! $this->hasFile('photo') && ! $this->filled('photo_library_path')) {
                $validator->errors()->add('photo', 'Please choose a portrait photo from the media library or upload one from your computer.');
            }
        });
    }
}
