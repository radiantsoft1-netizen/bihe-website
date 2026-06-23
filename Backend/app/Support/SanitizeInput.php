<?php

namespace App\Support;

class SanitizeInput
{
    /** Keys whose string values may contain editor HTML (sanitized later in controllers). */
    private const PRESERVE_HTML_KEYS = [
        'body',
        'excerpt',
        'message',
        'summary',
        'description',
        'content_lead',
        'seminar_workshop',
        'subject_teaching',
        'seo_description',
        'subtitle',
        'content_json',
    ];

    /**
     * Recursively strip HTML tags from string values.
     *
     * @param  list<string>  $exceptKeys  Top-level keys to leave unchanged (e.g. passwords).
     */
    public static function stripTags(mixed $value, array $exceptKeys = [], bool $inParagraphs = false): mixed
    {
        if (is_array($value)) {
            $sanitized = [];

            foreach ($value as $key => $item) {
                if (is_string($key) && in_array($key, $exceptKeys, true)) {
                    $sanitized[$key] = $item;

                    continue;
                }

                if ($key === 'paragraphs' && is_array($item)) {
                    $sanitized[$key] = collect($item)
                        ->map(function (mixed $paragraph) use ($exceptKeys): mixed {
                            if (is_array($paragraph)) {
                                return self::stripTags($paragraph, $exceptKeys, true);
                            }

                            if (is_string($paragraph)) {
                                return trim($paragraph);
                            }

                            return self::stripTags($paragraph, $exceptKeys, false);
                        })
                        ->all();

                    continue;
                }

                if ($inParagraphs && $key === 'text' && is_string($item)) {
                    $sanitized[$key] = trim($item);

                    continue;
                }

                if (is_string($key) && in_array($key, self::PRESERVE_HTML_KEYS, true) && is_string($item)) {
                    $sanitized[$key] = trim($item);

                    continue;
                }

                $sanitized[$key] = self::stripTags($item, $exceptKeys, false);
            }

            return $sanitized;
        }

        if (is_string($value)) {
            return strip_tags(trim($value));
        }

        return $value;
    }
}
