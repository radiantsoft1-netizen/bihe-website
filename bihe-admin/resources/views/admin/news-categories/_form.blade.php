<div class="form-group">
    <label class="form-label" for="name">Name</label>
    <input type="text" id="name" name="name" class="form-input" required
           value="{{ old('name', optional($newsCategory ?? null)->name ?? '') }}">
    @error('name')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="slug">Slug (optional)</label>
    <input type="text" id="slug" name="slug" class="form-input"
           value="{{ old('slug', optional($newsCategory ?? null)->slug ?? '') }}">
    <p class="form-hint">Auto-generated from name if left blank.</p>
    @error('slug')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="description">Description</label>
    <textarea id="description" name="description" class="form-textarea js-rich-text" data-rich-text rows="4">{{ old('description', optional($newsCategory ?? null)->description ?? '') }}</textarea>
    @error('description')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="sort_order">Sort Order</label>
    <input type="number" id="sort_order" name="sort_order" class="form-input" min="0"
           value="{{ old('sort_order', optional($newsCategory ?? null)->sort_order ?? 0) }}">
    @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="is_active" name="is_active" value="1"
               {{ old('is_active', optional($newsCategory ?? null)->is_active ?? true) ? 'checked' : '' }}>
        <span>Active</span>
    </label>
    @error('is_active')<p class="form-error">{{ $message }}</p>@enderror
</div>
