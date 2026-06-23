<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ActivityLogService;
use App\Services\MathCaptchaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function showLoginForm(MathCaptchaService $captcha)
    {
        if (auth()->check()) {
            return redirect()->route('admin.dashboard');
        }

        return view('auth.login', [
            'captchaQuestion' => $captcha->question(),
        ]);
    }

    public function login(Request $request, MathCaptchaService $captcha, ActivityLogService $activityLog)
    {
        $this->ensureIsNotRateLimited($request);

        $validated = $request->validate([
            'login_type' => ['required', Rule::in(['email', 'username'])],
            'login' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string'],
            'captcha_answer' => ['required', 'integer'],
        ]);

        if (! $captcha->validate($validated['captcha_answer'])) {
            $captcha->refresh();
            RateLimiter::hit($this->throttleKey($request));

            $activityLog->log(
                action: 'captcha_failed',
                subject: 'login',
                description: 'Math CAPTCHA validation failed',
                metadata: ['login_type' => $validated['login_type'], 'login' => $validated['login']],
            );

            return back()
                ->withErrors(['captcha_answer' => 'Incorrect answer. A new CAPTCHA has been generated.'])
                ->with('captcha_question', $captcha->question())
                ->onlyInput('login', 'login_type', 'remember');
        }

        $field = $validated['login_type'] === 'email' ? 'email' : 'username';

        if ($validated['login_type'] === 'email') {
            $request->validate(['login' => ['email']]);
        }

        $user = User::where($field, $validated['login'])->first();

        if ($user && ! $user->is_active) {
            $captcha->refresh();
            RateLimiter::hit($this->throttleKey($request));

            $activityLog->log(
                action: 'login_blocked',
                subject: $user->username,
                description: 'Login attempt on disabled account',
                user: $user,
            );

            return back()
                ->withErrors(['login' => 'This account has been disabled. Contact a Super Admin.'])
                ->with('captcha_question', $captcha->question())
                ->onlyInput('login', 'login_type', 'remember');
        }

        if (Auth::attempt([
            $field => $validated['login'],
            'password' => $validated['password'],
        ], $request->boolean('remember'))) {
            $request->session()->regenerate();
            $request->session()->put('last_activity_at', time());
            $captcha->clear();
            RateLimiter::clear($this->throttleKey($request));

            $activityLog->log(
                action: 'login',
                subject: auth()->user()->username,
                description: 'Successful login',
                user: auth()->user(),
                metadata: ['remember' => $request->boolean('remember')],
            );

            return redirect()->intended(route('admin.dashboard'));
        }

        $captcha->refresh();
        RateLimiter::hit($this->throttleKey($request));

        $activityLog->log(
            action: 'login_failed',
            subject: $validated['login'],
            description: 'Invalid credentials',
            metadata: ['login_type' => $validated['login_type']],
        );

        return back()
            ->withErrors(['login' => 'The provided credentials do not match our records.'])
            ->with('captcha_question', $captcha->question())
            ->onlyInput('login', 'login_type', 'remember');
    }

    public function logout(Request $request, ActivityLogService $activityLog)
    {
        $user = $request->user();

        if ($user) {
            $activityLog->log(
                action: 'logout',
                subject: $user->username,
                description: 'User logged out',
                user: $user,
            );
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    protected function ensureIsNotRateLimited(Request $request): void
    {
        $maxAttempts = (int) config('auth.login_throttle', 5);

        if (! RateLimiter::tooManyAttempts($this->throttleKey($request), $maxAttempts)) {
            return;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'login' => "Too many login attempts. Please try again in {$seconds} seconds.",
        ]);
    }

    protected function throttleKey(Request $request): string
    {
        return 'login|'.$request->ip().'|'.strtolower((string) $request->input('login', 'guest'));
    }
}
