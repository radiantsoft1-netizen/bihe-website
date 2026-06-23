<div class="form-group">
    <label class="form-label" for="level">Level</label>
    <input type="text" id="level" name="level" class="form-input" required
           value="{{ old('level', optional($program ?? null)->level ?? 'UG') }}" placeholder="UG">
    @error('level')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="program_name">Program Name</label>
    <input type="text" id="program_name" name="program_name" class="form-input" required
           value="{{ old('program_name', optional($program ?? null)->program_name ?? '') }}">
    @error('program_name')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="duration">Duration</label>
    <input type="text" id="duration" name="duration" class="form-input" required
           value="{{ old('duration', optional($program ?? null)->duration ?? '') }}" placeholder="3 Years">
    @error('duration')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="intake">Intake</label>
    <input type="text" id="intake" name="intake" class="form-input" required
           value="{{ old('intake', optional($program ?? null)->intake ?? '') }}" placeholder="180">
    @error('intake')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="department">Department</label>
    <select id="department" name="department" class="form-select" required>
        @foreach (['b-com' => 'B.Com', 'bca' => 'BCA'] as $value => $label)
            <option value="{{ $value }}" {{ old('department', optional($program ?? null)->department ?? 'b-com') === $value ? 'selected' : '' }}>
                {{ $label }}
            </option>
        @endforeach
    </select>
    @error('department')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="sort_order">Sort Order</label>
    <input type="number" id="sort_order" name="sort_order" class="form-input" min="0"
           value="{{ old('sort_order', optional($program ?? null)->sort_order ?? 0) }}">
    @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
</div>
