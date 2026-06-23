<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saved(function (User $user): void {
            if (! $user->role instanceof UserRole) {
                return;
            }

            $currentRoles = $user->getRoleNames();

            if ($currentRoles->count() !== 1 || ! $currentRoles->contains($user->role->value)) {
                $user->syncRoles([$user->role->value]);
            }
        });
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasRole(UserRole::SuperAdmin->value);
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(UserRole::Admin->value);
    }

    public function isStaff(): bool
    {
        return $this->hasRole(UserRole::Staff->value);
    }

    public function roleLabel(): string
    {
        return $this->role instanceof UserRole ? $this->role->label() : (string) $this->role;
    }

    public function canAccessModule(string $module): bool
    {
        return \App\Support\RoleAccess::canAccessModule($this, $module);
    }
}
