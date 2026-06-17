<?php

namespace App\Http\Middleware;

use App\Services\AdminActivityLogService;
use App\Services\WebsiteRevalidationService;
use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogAdminCrudMiddleware
{
    private const SKIP_ROUTES = [
        'admin.logout',
        'admin.captcha.refresh',
        'admin.password.email',
        'admin.password.update',
        'admin.login',
        'admin.users.reset-password',
        'admin.profile.update',
        'admin.change-password.update',
    ];

    private const SKIP_RESOURCES = [
        'users',
        'sessions',
    ];

    public function __construct(
        private AdminActivityLogService $activityLog,
        private WebsiteRevalidationService $websiteRevalidation,
    ) {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->shouldLog($request, $response)) {
            $this->logCrudAction($request);
            $this->refreshWebsiteCache($request);
        }

        return $response;
    }

    private function shouldLog(Request $request, Response $response): bool
    {
        if (! $request->user()) {
            return false;
        }

        if (! in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            return false;
        }

        if (! $response->isRedirection() && $response->getStatusCode() >= 400) {
            return false;
        }

        if ($request->session()->has('errors')) {
            return false;
        }

        if (! $request->session()->has('success')) {
            return false;
        }

        $routeName = $request->route()?->getName();

        if (! $routeName || ! str_starts_with($routeName, 'admin.')) {
            return false;
        }

        if (in_array($routeName, self::SKIP_ROUTES, true)) {
            return false;
        }

        $resource = $this->resolveResource($routeName);

        return $resource !== null && ! in_array($resource, self::SKIP_RESOURCES, true);
    }

    private function logCrudAction(Request $request): void
    {
        $routeName = (string) $request->route()?->getName();
        $resource = $this->resolveResource($routeName);
        $verb = $this->resolveVerb($routeName);

        if ($resource === null || $verb === null) {
            return;
        }

        [$resourceId, $label] = $this->resolveResourceIdentity($request);

        $this->activityLog->logCrud(
            verb: $verb,
            resource: $resource,
            description: ucfirst($verb).' '.$this->humanize($resource).($label ? ': '.$label : ''),
            user: $request->user(),
            request: $request,
            resourceId: $resourceId,
            metadata: [
                'route' => $routeName,
                'method' => $request->method(),
            ],
        );
    }

    private function resolveResource(string $routeName): ?string
    {
        $parts = explode('.', $routeName);

        if (count($parts) < 3) {
            return null;
        }

        if (($parts[2] ?? null) === 'media' && ($parts[1] ?? null) === 'gallery') {
            return 'gallery-media';
        }

        return $parts[1] ?? null;
    }

    private function resolveVerb(string $routeName): ?string
    {
        return match (true) {
            str_ends_with($routeName, '.store') => 'created',
            str_ends_with($routeName, '.update') => 'updated',
            str_ends_with($routeName, '.destroy') => 'deleted',
            default => null,
        };
    }

    private function resolveResourceIdentity(Request $request): array
    {
        foreach ($request->route()?->parameters() ?? [] as $parameter) {
            if ($parameter instanceof Model) {
                $label = $parameter->title
                    ?? $parameter->name
                    ?? $parameter->message
                    ?? $parameter->username
                    ?? null;

                return [(string) $parameter->getKey(), $label ? (string) $label : null];
            }
        }

        return [null, null];
    }

    private function humanize(string $value): string
    {
        return str_replace('-', ' ', $value);
    }

    private function refreshWebsiteCache(Request $request): void
    {
        $routeName = (string) $request->route()?->getName();
        $resource = $this->resolveResource($routeName);

        if ($resource === null) {
            return;
        }

        $this->websiteRevalidation->revalidateForResource($resource);
    }
}
