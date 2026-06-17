<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\MathCaptchaService;

class CaptchaController extends Controller
{
    public function refresh(MathCaptchaService $captcha)
    {
        $generated = $captcha->refresh();

        return response()->json([
            'question' => $generated['question'],
        ]);
    }
}
