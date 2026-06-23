@extends('layouts.guest')

@section('title', 'Login')

@section('content')
<div class="login-card">
    <div class="login-card__brand">
        <h1>BIHE Admin</h1>
        <p>Sign in to manage website content</p>
    </div>

    @include('components.alert')

    <form method="POST" action="{{ route('admin.login') }}" id="login-form">
        @csrf

        <input type="hidden" name="login_type" id="login_type" value="{{ old('login_type', 'email') }}">

        <div class="login-type-switch" role="group" aria-label="Login method">
            <button type="button" class="login-type-switch__btn {{ old('login_type', 'email') === 'email' ? 'is-active' : '' }}" data-login-type="email">Email</button>
            <button type="button" class="login-type-switch__btn {{ old('login_type') === 'username' ? 'is-active' : '' }}" data-login-type="username">Username</button>
        </div>

        <div class="form-group">
            <label class="form-label" for="login" id="login-label">Email</label>
            <input
                type="{{ old('login_type', 'email') === 'username' ? 'text' : 'email' }}"
                id="login"
                name="login"
                class="form-input"
                value="{{ old('login') }}"
                required
                autofocus
                autocomplete="username"
            >
            @error('login')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input type="password" id="password" name="password" class="form-input" required autocomplete="current-password">
            @error('password')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        <div class="form-group">
            <label class="form-label" for="captcha_answer">Security Check</label>
            <div class="captcha-box">
                <span class="captcha-box__question" id="captcha-question">{{ session('captcha_question', $captchaQuestion) }}</span>
                <button type="button" class="btn btn-outline btn-sm captcha-box__refresh" id="captcha-refresh" aria-label="Refresh CAPTCHA" title="Refresh CAPTCHA">↻</button>
            </div>
            <input
                type="number"
                id="captcha_answer"
                name="captcha_answer"
                class="form-input"
                inputmode="numeric"
                required
                autocomplete="off"
                placeholder="Your answer"
            >
            @error('captcha_answer')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        <div class="form-group login-form__meta">
            <label class="form-checkbox">
                <input type="checkbox" name="remember" value="1" {{ old('remember') ? 'checked' : '' }}>
                <span>Remember me</span>
            </label>
            <a href="{{ route('admin.password.request') }}" class="login-form__forgot">Forgot password?</a>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary" style="width:100%;">Sign In</button>
        </div>
    </form>
</div>
<script src="{{ \App\Support\AdminAsset::url('assets/js/admin.js') }}" defer></script>
@endsection
