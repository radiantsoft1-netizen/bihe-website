<div class="form-group">
    <label class="form-label" for="name">Full Name</label>
    <input type="text" id="name" name="name" class="form-input" required
           value="{{ old('name', optional($profile ?? null)->name ?? '') }}">
    @error('name')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="slug">Slug (optional)</label>
    <input type="text" id="slug" name="slug" class="form-input"
           value="{{ old('slug', optional($profile ?? null)->slug ?? '') }}">
    @error('slug')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="photo">Profile Photo</label>
    @include('components.media-picker', [
        'id' => 'photo',
        'name' => 'photo',
        'libraryName' => 'photo_library_path',
        'type' => 'image',
        'currentPath' => optional($profile ?? null)->photo_path,
        'hint' => 'JPEG, PNG, GIF, or WebP — max '.(int) config('uploads.types.image.max_size_kb').' KB.',
    ])
</div>

<div class="form-group">
    <label class="form-label" for="email">Email</label>
    <input type="email" id="email" name="email" class="form-input"
           value="{{ old('email', optional($profile ?? null)->email ?? '') }}">
    @error('email')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="phone">Mobile Number</label>
    <input type="text" id="phone" name="phone" class="form-input"
           value="{{ old('phone', optional($profile ?? null)->phone ?? '') }}">
    @error('phone')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="gender">Gender</label>
    <select id="gender" name="gender" class="form-input">
        <option value="">—</option>
        @foreach (config('alumni.genders', []) as $gender)
            <option value="{{ $gender }}" @selected(old('gender', optional($profile ?? null)->gender ?? '') === $gender)>{{ $gender }}</option>
        @endforeach
    </select>
    @error('gender')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="date_of_birth">Date of Birth</label>
    <input type="date" id="date_of_birth" name="date_of_birth" class="form-input"
           value="{{ old('date_of_birth', optional($profile ?? null)->date_of_birth?->format('Y-m-d') ?? '') }}">
    @error('date_of_birth')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="current_location">Current Location</label>
    <input type="text" id="current_location" name="current_location" class="form-input"
           value="{{ old('current_location', optional($profile ?? null)->current_location ?? '') }}">
    @error('current_location')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="program">Course / Department</label>
    <select id="program" name="program" class="form-input" required>
        @foreach (config('alumni.programs', []) as $program)
            <option value="{{ $program }}" @selected(old('program', optional($profile ?? null)->program ?? '') === $program)>{{ $program }}</option>
        @endforeach
    </select>
    @error('program')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="class_section">Class / Section</label>
    <input type="text" id="class_section" name="class_section" class="form-input"
           value="{{ old('class_section', optional($profile ?? null)->class_section ?? '') }}">
    @error('class_section')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="admission_year">Admission Year</label>
    <input type="number" id="admission_year" name="admission_year" class="form-input" min="1950" max="2100"
           value="{{ old('admission_year', optional($profile ?? null)->admission_year ?? '') }}">
    @error('admission_year')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="passout_year">Passout Year</label>
    <input type="number" id="passout_year" name="passout_year" class="form-input" min="1950" max="2100"
           value="{{ old('passout_year', optional($profile ?? null)->passout_year ?? optional($profile ?? null)->batch_year ?? '') }}">
    @error('passout_year')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="register_number">Register Number</label>
    <input type="text" id="register_number" name="register_number" class="form-input"
           value="{{ old('register_number', optional($profile ?? null)->register_number ?? '') }}">
    @error('register_number')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="current_role">Occupation / Designation</label>
    <input type="text" id="current_role" name="current_role" class="form-input"
           value="{{ old('current_role', optional($profile ?? null)->current_role ?? '') }}">
    @error('current_role')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="current_employer">Company / Organization</label>
    <input type="text" id="current_employer" name="current_employer" class="form-input"
           value="{{ old('current_employer', optional($profile ?? null)->current_employer ?? '') }}">
    @error('current_employer')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="current_status">Current Status</label>
    <select id="current_status" name="current_status" class="form-input">
        <option value="">—</option>
        @foreach (config('alumni.current_statuses', []) as $status)
            <option value="{{ $status }}" @selected(old('current_status', optional($profile ?? null)->current_status ?? '') === $status)>{{ $status }}</option>
        @endforeach
    </select>
    @error('current_status')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="linkedin_url">LinkedIn Profile</label>
    <input type="text" id="linkedin_url" name="linkedin_url" class="form-input" inputmode="url"
           value="{{ old('linkedin_url', optional($profile ?? null)->linkedin_url ?? '') }}"
           placeholder="https://linkedin.com/in/your-name">
    <p class="form-hint form-hint--tight">https:// is optional — it will be added automatically if omitted.</p>
    @error('linkedin_url')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="bio">Achievements / Bio</label>
    <textarea id="bio" name="bio" class="form-textarea" rows="5">{{ old('bio', optional($profile ?? null)->bio ?? '') }}</textarea>
    @error('bio')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="testimonial">Testimonial (optional)</label>
    <textarea id="testimonial" name="testimonial" class="form-textarea" rows="3">{{ old('testimonial', optional($profile ?? null)->testimonial ?? '') }}</textarea>
    @error('testimonial')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" name="willing_to_mentor" value="1"
               @checked(old('willing_to_mentor', optional($profile ?? null)->willing_to_mentor ?? false))>
        Willing to mentor students
    </label>
    @error('willing_to_mentor')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" name="is_featured" value="1"
               @checked(old('is_featured', optional($profile ?? null)->is_featured ?? false))>
        Featured alumni
    </label>
    @error('is_featured')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" name="published" value="1"
               @checked(old('published', optional($profile ?? null)->published ?? true))>
        Published on website
    </label>
    @error('published')<p class="form-error">{{ $message }}</p>@enderror
</div>

@if (empty($profile))
<div class="form-group">
    <label class="form-label" for="approval_status">Approval Status</label>
    <select id="approval_status" name="approval_status" class="form-input">
        @foreach (config('alumni.approval_statuses', []) as $value => $label)
            <option value="{{ $value }}" @selected(old('approval_status', 'approved') === $value)>{{ $label }}</option>
        @endforeach
    </select>
    @error('approval_status')<p class="form-error">{{ $message }}</p>@enderror
</div>
@endif

<div class="form-group">
    <label class="form-label" for="sort_order">Display Order</label>
    <input type="number" id="sort_order" name="sort_order" class="form-input" min="0"
           value="{{ old('sort_order', optional($profile ?? null)->sort_order ?? 0) }}">
    @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
</div>
