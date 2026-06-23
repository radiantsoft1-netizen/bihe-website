<?php

namespace Database\Seeders;

use App\Models\AdminActivityLog;
use App\Models\User;
use App\Services\AdminActivityLogService;
use Illuminate\Database\Seeder;

class AdminActivityLogSeeder extends Seeder
{
    public function run(AdminActivityLogService $activityLog): void
    {
        if (AdminActivityLog::exists()) {
            return;
        }

        $superAdmin = User::where('role', 'super_admin')->first();

        if (! $superAdmin) {
            return;
        }

        $activityLog->log(
            action: 'login',
            resource: $superAdmin->username,
            description: 'Successful login (seed demo)',
            user: $superAdmin,
            actionType: 'auth',
        );

        $activityLog->logCrud(
            verb: 'created',
            resource: 'announcements',
            description: 'Created announcement: Welcome to BIHE (seed demo)',
            user: $superAdmin,
            resourceId: '1',
        );

        $activityLog->log(
            action: 'login_failed',
            resource: 'unknown_user',
            description: 'Invalid credentials (seed demo)',
            actionType: 'auth',
        );
    }
}
