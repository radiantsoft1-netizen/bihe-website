<div class="form-group">
    <label class="form-label" for="name">Full Name</label>
    <input type="text" id="name" name="name" class="form-input" required
           value="{{ old('name', optional($user ?? null)->name) }}">
    @error('name')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="username">Username</label>
    <input type="text" id="username" name="username" class="form-input" required
           value="{{ old('username', optional($user ?? null)->username) }}">
    @error('username')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="email">Email</label>
    <input type="email" id="email" name="email" class="form-input" required
           value="{{ old('email', optional($user ?? null)->email) }}">
    @error('email')<p class="form-error">{{ $message }}</p>@enderror
</div>

@if (empty($user))
<div class="form-group">
    <label class="form-label" for="password">Password</label>
    <input type="password" id="password" name="password" class="form-input" required autocomplete="new-password">
    @error('password')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="password_confirmation">Confirm Password</label>
    <input type="password" id="password_confirmation" name="password_confirmation" class="form-input" required autocomplete="new-password">
</div>
@endif

<div class="form-group">
    <label class="form-label" for="role">Role</label>
    <select id="role" name="role" class="form-select" required>
        @foreach ($roles as $roleOption)
            <option value="{{ $roleOption->value }}"
                {{ old('role', optional($user ?? null)->role?->value ?? '') === $roleOption->value ? 'selected' : '' }}>
                {{ $roleOption->label() }}
            </option>
        @endforeach
    </select>
    @error('role')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="is_active" name="is_active" value="1"
               {{ old('is_active', optional($user ?? null)->is_active ?? true) ? 'checked' : '' }}>
        <span>Active account</span>
    </label>
    @error('is_active')<p class="form-error">{{ $message }}</p>@enderror
</div>
