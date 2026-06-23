<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\ApiKeyMiddleware;
use App\Http\Middleware\CheckModuleAccess;
use App\Http\Middleware\ForceHttpsMiddleware;
use App\Http\Middleware\LogAdminCrudMiddleware;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\SanitizeInputMiddleware;
use App\Http\Middleware\SecurityHeadersMiddleware;
use App\Http\Middleware\SessionInactivityMiddleware;
use App\Http\Middleware\UseForwardedHostUrl;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustProxies(at: '*');

        $middleware->redirectGuestsTo('/admin');
        $middleware->redirectUsersTo('/admin/dashboard');

        $middleware->web(prepend: [
            UseForwardedHostUrl::class,
            ForceHttpsMiddleware::class,
        ]);

        $middleware->web(append: [
            SecurityHeadersMiddleware::class,
        ]);

        $middleware->alias([
            'admin' => AdminMiddleware::class,
            'api.key' => ApiKeyMiddleware::class,
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
            'module' => CheckModuleAccess::class,
            'session.inactivity' => SessionInactivityMiddleware::class,
            'sanitize.input' => SanitizeInputMiddleware::class,
            'log.admin.crud' => LogAdminCrudMiddleware::class,
            'force.https' => ForceHttpsMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (UnauthorizedException $exception, $request): Response {
            $message = 'You do not have permission to access this area.';

            if ($request->expectsJson()) {
                return response()->json(['message' => $message], 403);
            }

            return response($message, 403);
        });
    })->create();
