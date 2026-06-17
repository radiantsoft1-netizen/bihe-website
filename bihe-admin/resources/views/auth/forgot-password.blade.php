@extends('layouts.guest')

@section('title', 'Forgot Password')

@section('content')
<div class="login-card">
    <div class="login-card__brand">
        <h1>Reset Password</h1>
        <p>Enter your email to receive a reset link</p>
    </div>

    @include('components.alert')

    <form method="POST" action="{{ route('admin.password.email') }}">
        @csrf

        <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" name="email" class="form-input" value="{{ old('email') }}" required autofocus>
            @error('email')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary" style="width:100%;">Send Reset Link</button>
            <a href="{{ route('admin.login') }}" class="btn btn-outline" style="width:100%;">Back to Login</a>
        </div>
    </form>
</div>
@endsection
