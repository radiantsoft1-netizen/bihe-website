<?php

namespace App\Support;

class AdminAsset
{
    /**
     * Public admin CSS/JS with filemtime cache-busting (no Node build on Hostinger).
     */
    public static function url(string $path): string
    {
        $fullPath = public_path($path);
        $version = is_file($fullPath) ? (string) filemtime($fullPath) : '1';

        return asset($path).'?v='.$version;
    }
}
