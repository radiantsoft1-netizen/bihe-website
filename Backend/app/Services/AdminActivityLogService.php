<?php

namespace App\Services;

use App\Models\AdminActivityLog;
use App\Models\User;
use App\Support\UserAgentParser;
use Illuminate\Http\Request;

class AdminActivityLogService
{
    public function log(
        string $action,
        ?string $resource = null,
        ?string $description = null,
        ?User $user = null,
        ?Request $request = null,
        array $metadata = [],
        ?string $resourceId = null,
        ?string $actionType = null,
    ): AdminActivityLog {
        $request ??= request();
        $parsedAgent = UserAgentParser::parse($request->userAgent());

        return AdminActivityLog::create([
            'user_id' => $user?->id,
            'action' => $action,
            'action_type' => $actionType ?? $this->inferActionType($action),
            'description' => $description,
            'resource' => $resource,
            'resource_id' => $resourceId,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'browser' => $parsedAgent['browser'],
            'device' => $parsedAgent['device'],
            'platform' => $parsedAgent['platform'],
            'metadata' => $metadata ?: null,
            'created_at' => now(),
        ]);
    }

    public function logCrud(
        string $verb,
        string $resource,
        ?string $description = null,
        ?User $user = null,
        ?Request $request = null,
        ?string $resourceId = null,
        array $metadata = [],
    ): AdminActivityLog {
        return $this->log(
            action: $resource.'_'.$verb,
            resource: $resource,
            description: $description,
            user: $user,
            request: $request,
            metadata: $metadata,
            resourceId: $resourceId,
            actionType: 'crud',
        );
    }

    public function inferActionType(string $action): ?string
    {
        if (in_array($action, ['login', 'logout', 'login_failed', 'login_blocked', 'captcha_failed'], true)) {
            return 'auth';
        }

        if (str_contains($action, 'password') || str_contains($action, 'session') || str_contains($action, 'profile')) {
            return 'security';
        }

        if (preg_match('/_(created|updated|deleted)$/', $action) || in_array($action, ['created', 'updated', 'deleted'], true)) {
            return 'crud';
        }

        return null;
    }
}
