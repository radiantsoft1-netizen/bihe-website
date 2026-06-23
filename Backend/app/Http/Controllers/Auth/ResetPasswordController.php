<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;

class ResetPasswordController extends Controller
{
    public function showResetForm(Request $request, string $token)
    {
        return view('auth.reset-password', [
            'token' => $token,
            'email' => $request->query('email', ''),
        ]);
    }

    public function reset(Request $request, ActivityLogService $activityLog)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', PasswordRule::defaults()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        $user = User::where('email', $request->email)->first();

        if ($status === Password::PASSWORD_RESET) {
            $activityLog->log(
                action: 'password_reset',
                subject: $request->email,
                description: 'Password reset via email link',
                user: $user,
            );

            return redirect()->route('admin.login')->with('success', __($status));
        }

        $activityLog->log(
            action: 'password_reset_failed',
            subject: $request->email,
            description: 'Password reset attempt failed',
            user: $user,
            metadata: ['status' => $status],
        );

        return back()->withErrors(['email' => [__($status)]]);
    }
}
