<?php

namespace App\Support;

use App\Rules\SecureUploadRule;

class UploadedFileRules
{
    /**
     * @return list<string|SecureUploadRule>
     */
    public static function images(bool $required = false): array
    {
        return array_values(array_filter([
            $required ? 'required' : 'nullable',
            'array',
        ]));
    }

    /**
     * @return list<string|SecureUploadRule>
     */
    public static function image(bool $required = false): array
    {
        return array_values(array_filter([
            $required ? 'required' : 'nullable',
            new SecureUploadRule('image'),
        ]));
    }

    /**
     * @return list<string|SecureUploadRule>
     */
    public static function pdf(bool $required = false): array
    {
        return array_values(array_filter([
            $required ? 'required' : 'nullable',
            new SecureUploadRule('pdf'),
        ]));
    }
}
