<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePasswordRequest;
use App\Services\ActivityLogService;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    public function edit()
    {
        return view('admin.change-password.edit');
    }

    public function update(UpdatePasswordRequest $request, ActivityLogService $activityLog)
    {
        $user = $request->user();

        $user->update([
            'password' => Hash::make($request->validated('password')),
        ]);

        $activityLog->log(
            action: 'password_changed',
            subject: $user->username,
            description: 'User changed their password',
            user: $user,
            request: $request,
        );

        return redirect()->route('admin.change-password.edit')
            ->with('success', 'Password changed successfully.');
    }
}
