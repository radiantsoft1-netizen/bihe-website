<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Concerns\NormalizesExternalUrls;
use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StoreAlumniProfileRequest extends BaseFormRequest
{
    use NormalizesExternalUrls;

    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $this->normalizeExternalUrlInput('linkedin_url');

        parent::prepareForValidation();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'gender' => ['nullable', 'string', 'max:30', Rule::in(config('alumni.genders', []))],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'current_location' => ['nullable', 'string', 'max:255'],
            'program' => ['required', 'string', 'max:255', Rule::in(config('alumni.programs', []))],
            'class_section' => ['nullable', 'string', 'max:50'],
            'admission_year' => ['nullable', 'integer', 'min:1950', 'max:2100'],
            'passout_year' => ['nullable', 'integer', 'min:1950', 'max:2100'],
            'register_number' => ['nullable', 'string', 'max:60'],
            'current_role' => ['nullable', 'string', 'max:255'],
            'current_employer' => ['nullable', 'string', 'max:255'],
            'current_status' => ['nullable', 'string', 'max:60', Rule::in(config('alumni.current_statuses', []))],
            'bio' => ['nullable', 'string', 'max:5000'],
            'testimonial' => ['nullable', 'string', 'max:2000'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'willing_to_mentor' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],
            'published' => ['sometimes', 'boolean'],
            'approval_status' => ['nullable', 'string', Rule::in(array_keys(config('alumni.approval_statuses', [])))],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'photo' => UploadedFileRules::image(),
            'photo_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return array_merge(parent::messages(), [
            'linkedin_url.url' => 'Enter a valid LinkedIn profile URL (for example, https://linkedin.com/in/your-name).',
            'email.email' => 'Enter a valid email address or leave the field blank.',
            'photo.uploaded' => 'The profile photo failed to upload. Try a smaller JPG, PNG, GIF, or WebP file.',
        ]);
    }
}
