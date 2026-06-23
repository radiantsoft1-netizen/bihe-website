<?php

namespace App\Http\Requests\Admin;

use App\Models\FacultyDepartment;
use App\Rules\MediaLibraryPath;
use App\Support\UploadedFileRules;
use Illuminate\Validation\Rule;

class StoreFacultyRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $departmentSlugs = FacultyDepartment::active()->pluck('slug')->all();

        return [
            'name' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'qualification' => ['nullable', 'string', 'max:255'],
            'experience' => ['nullable', 'string', 'max:255'],
            'seminar_workshop' => ['nullable', 'string'],
            'subject_teaching' => ['nullable', 'string'],
            'departments' => ['required', 'array', 'min:1'],
            'departments.*' => ['required', 'string', Rule::in($departmentSlugs)],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'photo' => UploadedFileRules::image(),
            'photo_library_path' => ['nullable', 'string', new MediaLibraryPath('image')],
            'resume' => UploadedFileRules::pdf(),
            'resume_library_path' => ['nullable', 'string', new MediaLibraryPath('pdf')],
            'published' => ['sometimes', 'boolean'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if (! $this->hasFile('photo') && ! $this->filled('photo_library_path')) {
                $validator->errors()->add('photo', 'Please choose a photo from the media library or upload one from your computer.');
            }
        });
    }
}
