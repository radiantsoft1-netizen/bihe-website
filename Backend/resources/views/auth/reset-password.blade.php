@extends('layouts.guest')

@section('title', 'Reset Password')

@section('content')
<div class="login-card">
    <div class="login-card__brand">
        <h1>New Password</h1>
        <p>Choose a new password for your account</p>
    </div>

    @include('components.alert')

    <form method="POST" action="{{ route('admin.password.update') }}">
        @csrf

        <input type="hidden" name="token" value="{{ $token }}">

        <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" name="email" class="form-input" value="{{ old('email', $email) }}" required autofocus>
            @error('email')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        <div class="form-group">
            <label class="form-label" for="password">New Password</label>
            <input type="password" id="password" name="password" class="form-input" required autocomplete="new-password">
            @error('password')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        <div class="form-group">
            <label class="form-label" for="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" class="form-input" required autocomplete="new-password">
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary" style="width:100%;">Reset Password</button>
        </div>
    </form>
</div>
@endsection
