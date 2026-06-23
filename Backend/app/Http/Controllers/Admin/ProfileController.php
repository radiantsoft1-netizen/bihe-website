<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProfileRequest;
use App\Services\ActivityLogService;

class ProfileController extends Controller
{
    public function edit()
    {
        return view('admin.profile.edit', [
            'user' => auth()->user(),
        ]);
    }

    public function update(UpdateProfileRequest $request, ActivityLogService $activityLog)
    {
        $user = $request->user();
        $user->update($request->validated());

        $activityLog->log(
            action: 'profile_updated',
            subject: $user->username,
            description: 'User updated their profile',
            user: $user,
            request: $request,
        );

        return redirect()->route('admin.profile.edit')
            ->with('success', 'Profile updated successfully.');
    }
}
