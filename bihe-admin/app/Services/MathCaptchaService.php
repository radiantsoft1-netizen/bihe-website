<?php

namespace App\Services;

class MathCaptchaService
{
    private const SESSION_KEY = 'login_math_captcha';

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

        session([
            self::SESSION_KEY => [
                'answer' => $answer,
                'question' => $question,
            ],
        ]);

        return [
            'question' => $question,
        ];
    }

    public function question(): string
    {
        $captcha = session(self::SESSION_KEY);

        if (! is_array($captcha) || ! isset($captcha['question'])) {
            return $this->generate()['question'];
        }

        return $captcha['question'];
    }

    public function validate(mixed $userAnswer): bool
    {
        $captcha = session(self::SESSION_KEY);

        if (! is_array($captcha) || ! isset($captcha['answer'])) {
            return false;
        }

        if ($userAnswer === null || $userAnswer === '') {
            return false;
        }

        return (int) $userAnswer === (int) $captcha['answer'];
    }

    public function refresh(): array
    {
        return $this->generate();
    }

    public function clear(): void
    {
        session()->forget(self::SESSION_KEY);
    }
}
