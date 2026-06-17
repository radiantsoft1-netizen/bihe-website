@extends('layouts.app')

@section('title', 'My Profile')
@section('page-title', 'My Profile')

@section('content')
<div class="admin-card admin-card--form">
    <p style="margin:0 0 1rem;color:var(--bihe-muted);font-size:0.875rem;">
        Update your account details. Username and role are managed by an administrator.
    </p>
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.profile.update') }}">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label class="form-label" for="name">Full Name</label>
            <input type="text" id="name" name="name" class="form-input" required
                   value="{{ old('name', $user->name) }}" autocomplete="name">
            @error('name')<p class="form-error">{{ $message }}</p>@enderror
        </div>
        <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" name="email" class="form-input" required
                   value="{{ old('email', $user->email) }}" autocomplete="email">
            @error('email')<p class="form-error">{{ $message }}</p>@enderror
        </div>
        <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" class="form-input" value="{{ $user->username }}" disabled readonly>
        </div>
        <div class="form-group">
            <label class="form-label">Role</label>
            <input type="text" class="form-input" value="{{ $user->roleLabel() }}" disabled readonly>
        </div>
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Profile</button>
            <a href="{{ route('admin.dashboard') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
