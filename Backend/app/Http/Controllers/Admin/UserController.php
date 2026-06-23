<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Models\User;
use App\Services\ActivityLogService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password as PasswordRule;

class UserController extends Controller
{
    use BulkDestroysRecords;

    public function index(Request $request)
    {
        $users = AdminPagination::paginate(User::query()->orderBy('name'), $request, 15);
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.users.index', compact('users', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.users.create', [
            'roles' => UserRole::cases(),
        ]);
    }

    public function store(Request $request, ActivityLogService $activityLog)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', 'unique:users,username'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', PasswordRule::defaults()],
            'role' => ['required', Rule::in(UserRole::values())],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $request->boolean('is_active', true);

        $user = User::create($validated);
        $user->syncRoles([$validated['role']]);

        $activityLog->log(
            action: 'user_created',
            subject: $user->username,
            description: 'Super Admin created user account',
            user: $request->user(),
            metadata: ['role' => $user->role->value, 'target_user_id' => $user->id],
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return view('admin.users.edit', [
            'user' => $user,
            'roles' => UserRole::cases(),
        ]);
    }

    public function update(Request $request, User $user, ActivityLogService $activityLog)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['required', Rule::in(UserRole::values())],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        if ($user->id === auth()->id() && ! $validated['is_active']) {
            return back()->withErrors(['is_active' => 'You cannot disable your own account.']);
        }

        if ($user->id === auth()->id() && $validated['role'] !== UserRole::SuperAdmin->value) {
            return back()->withErrors(['role' => 'You cannot change your own Super Admin role.']);
        }

        $user->update($validated);
        $user->syncRoles([$validated['role']]);

        $activityLog->log(
            action: 'user_updated',
            subject: $user->username,
            description: 'Super Admin updated user account',
            user: $request->user(),
            metadata: ['target_user_id' => $user->id, 'role' => $user->role->value],
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user, ActivityLogService $activityLog)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        if ($user->isSuperAdmin() && User::where('role', UserRole::SuperAdmin)->count() <= 1) {
            return back()->with('error', 'Cannot delete the only Super Admin account.');
        }

        $username = $user->username;
        $userId = $user->id;
        $user->delete();

        $activityLog->log(
            action: 'user_deleted',
            subject: $username,
            description: 'Super Admin deleted user account',
            user: auth()->user(),
            metadata: ['target_user_id' => $userId],
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request, ActivityLogService $activityLog)
    {
        return $this->bulkDestroyRecords(
            $request,
            User::class,
            'admin.users.index',
            function (User $user) use ($activityLog): void {
                $username = $user->username;
                $userId = $user->id;
                $user->delete();

                $activityLog->log(
                    action: 'user_deleted',
                    subject: $username,
                    description: 'Super Admin deleted user account',
                    user: auth()->user(),
                    metadata: ['target_user_id' => $userId],
                );
            },
            function (User $user): bool {
                if ($user->id === auth()->id()) {
                    return false;
                }

                if ($user->isSuperAdmin() && User::where('role', UserRole::SuperAdmin)->count() <= 1) {
                    return false;
                }

                return true;
            },
        );
    }

    public function showResetPasswordForm(User $user)
    {
        return view('admin.users.reset-password', compact('user'));
    }

    public function resetPassword(Request $request, User $user, ActivityLogService $activityLog)
    {
        $validated = $request->validate([
            'password' => ['required', 'confirmed', PasswordRule::defaults()],
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        $activityLog->log(
            action: 'password_reset_manual',
            subject: $user->username,
            description: 'Super Admin manually reset user password',
            user: $request->user(),
            metadata: ['target_user_id' => $user->id],
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Password reset successfully for '.$user->name.'.');
    }
}
