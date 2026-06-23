<?php

namespace App\Support;

class YoutubeUrl
{
    public static function extractId(?string $url): ?string
    {
        if (blank($url)) {
            return null;
        }

        $patterns = [
            '/youtu\.be\/([A-Za-z0-9_-]{6,})/',
            '/youtube\.com\/(?:embed|shorts|watch)\S*v=([A-Za-z0-9_-]{6,})/',
            '/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/',
            '/youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }
}
