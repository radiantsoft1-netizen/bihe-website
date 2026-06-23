<?php

namespace App\Http\Requests\Api;

use App\Http\Requests\Concerns\SanitizesInput;
use Illuminate\Foundation\Http\FormRequest;

class ContactSubmitRequest extends FormRequest
{
    use SanitizesInput;

    public function authorize(): bool
    {
        return true;
    }

    protected function sanitizedStringFields(): array
    {
        return ['name', 'email', 'mobile', 'subject', 'message'];
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'mobile' => ['required', 'string', 'max:20', 'regex:/^[0-9+\-\s()]{7,20}$/'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'captcha_id' => ['required', 'uuid'],
            'captcha_answer' => ['required', 'integer'],
        ];
    }
}
