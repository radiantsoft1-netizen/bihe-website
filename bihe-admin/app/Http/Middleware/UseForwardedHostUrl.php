<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class UseForwardedHostUrl
{
    public function handle(Request $request, Closure $next): Response
    {
        $forwardedHost = $request->headers->get('X-Forwarded-Host');
        $forwardedProto = $request->headers->get('X-Forwarded-Proto', 'https');

        if ($forwardedHost && $this->isAllowedProxyHost($forwardedHost)) {
            URL::forceRootUrl(rtrim("{$forwardedProto}://{$forwardedHost}", '/'));
            $request->server->set('HTTPS', $forwardedProto === 'https' ? 'on' : 'off');
        }

        return $next($request);
    }

    private function isAllowedProxyHost(string $host): bool
    {
        $allowed = array_filter(array_map('trim', explode(',', (string) env('ADMIN_PROXY_HOSTS', ''))));

        return in_array($host, $allowed, true);
    }
}
