<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use App\Support\AdminPermissions;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (AdminPermissions::all() as $permission) {
            Permission::findOrCreate($permission, AdminPermissions::GUARD);
        }

        foreach (UserRole::cases() as $userRole) {
            $role = Role::findOrCreate($userRole->value, AdminPermissions::GUARD);
            $role->syncPermissions(AdminPermissions::forRole($userRole));
        }

        User::query()->each(function (User $user): void {
            if ($user->role instanceof UserRole) {
                $user->syncRoles([$user->role->value]);
            }
        });
    }
}
