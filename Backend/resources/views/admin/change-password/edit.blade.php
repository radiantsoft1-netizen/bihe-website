@extends('layouts.app')

@section('title', 'Change Password')
@section('page-title', 'Change Password')

@section('content')
<div class="admin-card admin-card--form">
    <p style="margin:0 0 1rem;color:var(--bihe-muted);font-size:0.875rem;">
        Enter your current password, then choose a new password for your account.
    </p>
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.change-password.update') }}">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label class="form-label" for="current_password">Current Password</label>
            <input type="password" id="current_password" name="current_password" class="form-input" required autocomplete="current-password">
            @error('current_password')<p class="form-error">{{ $message }}</p>@enderror
        </div>
        <div class="form-group">
            <label class="form-label" for="password">New Password</label>
            <input type="password" id="password" name="password" class="form-input" required autocomplete="new-password">
            @error('password')<p class="form-error">{{ $message }}</p>@enderror
        </div>
        <div class="form-group">
            <label class="form-label" for="password_confirmation">Confirm New Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" class="form-input" required autocomplete="new-password">
        </div>
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Change Password</button>
            <a href="{{ route('admin.profile.edit') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
