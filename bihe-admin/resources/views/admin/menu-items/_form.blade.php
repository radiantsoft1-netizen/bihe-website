@php($item = $menuItem ?? null)

<div class="form-group">
    <label class="form-label" for="menu_key">Menu</label>
    <select id="menu_key" name="menu_key" class="form-input" required>
        <option value="header" {{ old('menu_key', $item?->menu_key ?? $menuKey ?? 'header') === 'header' ? 'selected' : '' }}>Header</option>
        <option value="footer" {{ old('menu_key', $item?->menu_key ?? $menuKey ?? 'header') === 'footer' ? 'selected' : '' }}>Footer</option>
    </select>
    @error('menu_key')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="parent_id">Parent Item (optional)</label>
    <select id="parent_id" name="parent_id" class="form-input">
        <option value="">Top-level item</option>
        @foreach ($parents as $parent)
            <option value="{{ $parent->id }}" {{ (string) old('parent_id', $item?->parent_id) === (string) $parent->id ? 'selected' : '' }}>
                {{ $parent->label }}
            </option>
        @endforeach
    </select>
    @error('parent_id')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="label">Label</label>
    <input type="text" id="label" name="label" class="form-input" required value="{{ old('label', $item?->label ?? '') }}">
    @error('label')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="href">Link URL</label>
    <input type="text" id="href" name="href" class="form-input" value="{{ old('href', $item?->href ?? '') }}" placeholder="/about-bihe or https://...">
    @error('href')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="description">Description (header dropdown only)</label>
    <textarea id="description" name="description" class="form-input js-rich-text" data-rich-text rows="3">{{ old('description', $item?->description ?? '') }}</textarea>
    @error('description')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="sort_order">Sort Order</label>
    <input type="number" id="sort_order" name="sort_order" class="form-input" min="0" value="{{ old('sort_order', $item?->sort_order ?? 0) }}">
    @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="is_visible" name="is_visible" value="1" {{ old('is_visible', $item?->is_visible ?? true) ? 'checked' : '' }}>
        <span>Visible</span>
    </label>
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="open_in_new_tab" name="open_in_new_tab" value="1" {{ old('open_in_new_tab', $item?->open_in_new_tab ?? false) ? 'checked' : '' }}>
        <span>Open in new tab</span>
    </label>
</div>
