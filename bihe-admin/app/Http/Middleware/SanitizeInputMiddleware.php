<?php

namespace App\Http\Middleware;

use App\Support\SanitizeInput;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SanitizeInputMiddleware
{
    /** @var list<string> */
    private array $except = [
        'password',
        'password_confirmation',
        'current_password',
        'paragraphs',
        'content_json',
        'projects',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH'], true)) {
            $request->merge(
                SanitizeInput::stripTags($request->except($this->except), $this->except)
            );
        }

        return $next($request);
    }
}
