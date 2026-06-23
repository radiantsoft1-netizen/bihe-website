<?php

namespace App\Http\Requests\Concerns;

use App\Support\SanitizeInput;

trait SanitizesInput
{
    /**
     * Request input keys that should not be tag-stripped (passwords, tokens, etc.).
     *
     * @return list<string>
     */
    protected function sanitizeExcept(): array
    {
        return [
            'password',
            'password_confirmation',
            'current_password',
            'paragraphs',
            'content_json',
            'projects',
        ];
    }

    /**
     * Explicit string fields to sanitize. When empty, all string inputs are sanitized.
     *
     * @return list<string>
     */
    protected function sanitizedStringFields(): array
    {
        return [];
    }

    protected function prepareForValidation(): void
    {
        $except = $this->sanitizeExcept();
        $fields = $this->sanitizedStringFields();

        if ($fields === []) {
            $this->merge(SanitizeInput::stripTags($this->except($except), $except));

            return;
        }

        $merge = [];

        foreach ($fields as $field) {
            if ($this->has($field) && is_string($this->input($field))) {
                $merge[$field] = strip_tags(trim($this->input($field)));
            }
        }

        if ($merge !== []) {
            $this->merge($merge);
        }
    }
}
