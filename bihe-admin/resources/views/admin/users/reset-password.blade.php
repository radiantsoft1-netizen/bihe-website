@extends('layouts.app')

@section('title', 'Reset Password')
@section('page-title', 'Reset Password — '.$user->name)

@section('content')
<div class="admin-card admin-card--form">
    <p style="margin:0 0 1rem;color:var(--bihe-muted);font-size:0.875rem;">
        Set a new password for <strong>{{ $user->name }}</strong> ({{ $user->username }}).
    </p>
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.users.reset-password', $user) }}">
        @csrf
        <div class="form-group">
            <label class="form-label" for="password">New Password</label>
            <input type="password" id="password" name="password" class="form-input" required autocomplete="new-password">
            @error('password')<p class="form-error">{{ $message }}</p>@enderror
        </div>
        <div class="form-group">
            <label class="form-label" for="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" class="form-input" required autocomplete="new-password">
        </div>
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Reset Password</button>
            <a href="{{ route('admin.users.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
