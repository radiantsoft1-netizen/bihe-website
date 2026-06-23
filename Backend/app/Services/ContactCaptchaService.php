<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ContactCaptchaService
{
    public function generate(): array
    {
        $a = random_int(1, 12);
        $b = random_int(1, 12);
        $useAddition = random_int(0, 1) === 1;

        if ($useAddition) {
            $answer = $a + $b;
            $question = "{$a} + {$b} = ?";
        } else {
            if ($a < $b) {
                [$a, $b] = [$b, $a];
            }
            $answer = $a - $b;
            $question = "{$a} - {$b} = ?";
        }

        $captchaId = (string) Str::uuid();
        $ttl = (int) config('contact.captcha_ttl_seconds', 600);

        Cache::put($this->cacheKey($captchaId), $answer, $ttl);

        return [
            'captchaId' => $captchaId,
            'question' => $question,
        ];
    }

    public function validate(string $captchaId, mixed $userAnswer): bool
    {
        if ($captchaId === '' || $userAnswer === null || $userAnswer === '') {
            return false;
        }

        $expected = Cache::pull($this->cacheKey($captchaId));

        if ($expected === null) {
            return false;
        }

        return (int) $userAnswer === (int) $expected;
    }

    protected function cacheKey(string $captchaId): string
    {
        return 'contact_captcha:'.$captchaId;
    }
}
