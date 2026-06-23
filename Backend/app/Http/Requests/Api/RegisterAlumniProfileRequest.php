<?php

namespace App\Http\Requests\Api;

use App\Http\Requests\Concerns\NormalizesExternalUrls;
use App\Http\Requests\Concerns\SanitizesInput;
use App\Support\UploadedFileRules;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterAlumniProfileRequest extends FormRequest
{
    use NormalizesExternalUrls;
    use SanitizesInput;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->normalizeExternalUrlInput('linkedin_url');

        parent::prepareForValidation();
    }

    protected function sanitizedStringFields(): array
    {
        return [
            'name',
            'email',
            'phone',
            'gender',
            'current_location',
            'program',
            'class_section',
            'register_number',
            'current_role',
            'current_employer',
            'current_status',
            'bio',
            'linkedin_url',
        ];
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^[0-9+\-\s()]{7,20}$/'],
            'gender' => ['nullable', 'string', 'max:30', Rule::in(config('alumni.genders', []))],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'current_location' => ['nullable', 'string', 'max:255'],
            'program' => ['required', 'string', 'max:255', Rule::in(config('alumni.programs', ['BCA', 'B.Com']))],
            'class_section' => ['nullable', 'string', 'max:50'],
            'admission_year' => ['nullable', 'integer', 'min:1950', 'max:2100'],
            'passout_year' => ['required', 'integer', 'min:1950', 'max:2100'],
            'register_number' => ['nullable', 'string', 'max:60'],
            'current_role' => ['nullable', 'string', 'max:255'],
            'current_employer' => ['nullable', 'string', 'max:255'],
            'current_status' => ['nullable', 'string', 'max:60', Rule::in(config('alumni.current_statuses', []))],
            'bio' => ['nullable', 'string', 'max:5000'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'willing_to_mentor' => ['required', Rule::in(['0', '1', 0, 1, true, false, 'yes', 'no'])],
            'photo' => UploadedFileRules::image(),
            'captcha_id' => ['required', 'uuid'],
            'captcha_answer' => ['required', 'integer'],
        ];
    }

    public function willingToMentor(): bool
    {
        $value = $this->input('willing_to_mentor');

        return in_array($value, [1, '1', true, 'yes'], true);
    }
}
