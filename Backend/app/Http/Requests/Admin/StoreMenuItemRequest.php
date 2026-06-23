<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;

class StoreMenuItemRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'menu_key' => ['required', 'string', Rule::in(['header', 'footer'])],
            'parent_id' => ['nullable', 'integer', 'exists:menu_items,id'],
            'label' => ['required', 'string', 'max:255'],
            'href' => ['nullable', 'string', 'max:512'],
            'description' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_visible' => ['sometimes', 'boolean'],
            'open_in_new_tab' => ['sometimes', 'boolean'],
        ];
    }
}
