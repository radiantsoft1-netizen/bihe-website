<?php

namespace App\Http\Requests\Api;

use App\Http\Requests\Concerns\SanitizesInput;
use Illuminate\Foundation\Http\FormRequest;

class CheckAlumniRegistrationStatusRequest extends FormRequest
{
    use SanitizesInput;

    public function authorize(): bool
    {
        return true;
    }

    protected function sanitizedStringFields(): array
    {
        return [
            'tracking_id',
        ];
    }

    public function rules(): array
    {
        return [
            'tracking_id' => ['required', 'string', 'max:40'],
        ];
    }
}
