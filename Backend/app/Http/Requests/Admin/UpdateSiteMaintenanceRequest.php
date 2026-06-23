<?php

namespace App\Http\Requests\Admin;

class UpdateSiteMaintenanceRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'enabled' => ['sometimes', 'boolean'],
            'mode' => ['required', 'in:construction,staging'],
            'headline' => ['required', 'string', 'max:160'],
            'message' => ['nullable', 'string', 'max:2000'],
            'contact_email' => ['nullable', 'email', 'max:190'],
        ];
    }
}
