<?php

namespace App\Http\Requests\Concerns;

trait NormalizesExternalUrls
{
    protected function normalizeExternalUrlInput(string $key): void
    {
        $value = $this->input($key);

        if (! is_string($value)) {
            return;
        }

        $value = trim($value);

        if ($value === '') {
            $this->merge([$key => null]);

            return;
        }

        if (! preg_match('~^https?://~i', $value)) {
            $this->merge([$key => 'https://'.$value]);
        }
    }
}
