<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SessionInactivityMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $timeoutSeconds = (int) config('session.inactivity_timeout', 30) * 60;
            $lastActivity = $request->session()->get('last_activity_at');

            if ($lastActivity && (time() - $lastActivity) > $timeoutSeconds) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()
                    ->route('admin.login')
                    ->with('error', 'You were logged out due to inactivity.');
            }

            $request->session()->put('last_activity_at', time());
        }

        return $next($request);
    }
}
