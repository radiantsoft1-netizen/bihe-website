<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@bihe.edu')],
            [
                'name' => env('ADMIN_NAME', 'BIHE Super Admin'),
                'username' => env('ADMIN_USERNAME', 'superadmin'),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'change-me-secure-password')),
                'role' => UserRole::SuperAdmin,
                'is_active' => true,
            ]
        );
        $superAdmin->syncRoles([UserRole::SuperAdmin->value]);

        $staff = User::updateOrCreate(
            ['email' => env('STAFF_EMAIL', 'staff@bihe.edu')],
            [
                'name' => env('STAFF_NAME', 'BIHE Staff'),
                'username' => env('STAFF_USERNAME', 'staff'),
                'password' => Hash::make(env('STAFF_PASSWORD', 'change-me-staff-password')),
                'role' => UserRole::Staff,
                'is_active' => true,
            ]
        );
        $staff->syncRoles([UserRole::Staff->value]);
    }
}
