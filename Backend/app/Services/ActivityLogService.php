<?php

namespace App\Services;

use App\Models\AdminActivityLog;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Backward-compatible wrapper around AdminActivityLogService.
 */
class ActivityLogService
{
    public function __construct(private AdminActivityLogService $adminActivityLog)
    {
    }

    public function log(
        string $action,
        ?string $subject = null,
        ?string $description = null,
        ?User $user = null,
        ?Request $request = null,
        array $metadata = [],
    ): AdminActivityLog {
        return $this->adminActivityLog->log(
            action: $action,
            resource: $subject,
            description: $description,
            user: $user,
            request: $request,
            metadata: $metadata,
            resourceId: isset($metadata['target_user_id']) ? (string) $metadata['target_user_id'] : null,
        );
    }
}
