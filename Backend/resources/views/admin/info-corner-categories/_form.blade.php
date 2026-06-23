<div class="form-group">
    <label class="form-label" for="name">Name</label>
    <input type="text" id="name" name="name" class="form-input" required
           value="{{ old('name', optional($infoCornerCategory ?? null)->name ?? '') }}">
    @error('name')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="slug">Slug (optional)</label>
    <input type="text" id="slug" name="slug" class="form-input"
           value="{{ old('slug', optional($infoCornerCategory ?? null)->slug ?? '') }}">
    @error('slug')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="published" name="published" value="1"
               @checked(old('published', optional($infoCornerCategory ?? null)->published ?? true))>
        <span>Published</span>
    </label>
    @error('published')<p class="form-error">{{ $message }}</p>@enderror
</div>
