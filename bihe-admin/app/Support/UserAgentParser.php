<?php

namespace App\Support;

class UserAgentParser
{
    public static function parse(?string $userAgent): array
    {
        if ($userAgent === null || trim($userAgent) === '') {
            return [
                'browser' => null,
                'device' => null,
                'platform' => null,
            ];
        }

        return [
            'browser' => self::detectBrowser($userAgent),
            'device' => self::detectDevice($userAgent),
            'platform' => self::detectPlatform($userAgent),
        ];
    }

    private static function detectBrowser(string $userAgent): ?string
    {
        $patterns = [
            'Edge' => '/Edg\/([\d.]+)/',
            'Chrome' => '/Chrome\/([\d.]+)/',
            'Firefox' => '/Firefox\/([\d.]+)/',
            'Safari' => '/Version\/([\d.]+).*Safari/',
            'Opera' => '/OPR\/([\d.]+)/',
        ];

        foreach ($patterns as $name => $pattern) {
            if (preg_match($pattern, $userAgent, $matches)) {
                return $name.' '.explode('.', $matches[1])[0];
            }
        }

        if (str_contains($userAgent, 'Safari') && ! str_contains($userAgent, 'Chrome')) {
            return 'Safari';
        }

        return null;
    }

    private static function detectPlatform(string $userAgent): ?string
    {
        $patterns = [
            'Windows' => '/Windows NT/',
            'macOS' => '/Macintosh|Mac OS X/',
            'Linux' => '/Linux/',
            'Android' => '/Android/',
            'iOS' => '/iPhone|iPad|iPod/',
        ];

        foreach ($patterns as $name => $pattern) {
            if (preg_match($pattern, $userAgent)) {
                return $name;
            }
        }

        return null;
    }

    private static function detectDevice(string $userAgent): string
    {
        if (preg_match('/Mobile|Android|iPhone|iPod|IEMobile|Opera Mini/i', $userAgent)) {
            if (preg_match('/iPad|Tablet|Kindle|Silk/i', $userAgent)) {
                return 'Tablet';
            }

            return 'Mobile';
        }

        return 'Desktop';
    }
}
