<div class="form-group">
    <label class="form-label" for="title">Title</label>
    <input type="text" id="title" name="title" class="form-input" required
           value="{{ old('title', optional($document ?? null)->title ?? '') }}">
    @error('title')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="category">Category</label>
    <input type="text" id="category" name="category" class="form-input"
           value="{{ old('category', optional($document ?? null)->category ?? '') }}" placeholder="e.g. Admissions, Academics">
    @error('category')<p class="form-error">{{ $message }}</p>@enderror
</div>

<section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images form-group--media">
    <label class="form-label" for="file">PDF File @if(empty($requireFile)) (leave blank to keep current) @endif</label>
    @include('components.media-picker', [
        'id' => 'file',
        'name' => 'file',
        'libraryName' => 'file_library_path',
        'type' => 'pdf',
        'currentPath' => optional($document ?? null)->file_path,
        'currentLabel' => optional($document ?? null)->file_name,
        'required' => !empty($requireFile),
    ])
    @if (!empty(optional($document ?? null)->file_path))
        <p class="form-hint form-hint--tight">
            <a href="{{ route('admin.files.documents', optional($document ?? null)) }}" target="_blank" rel="noopener">
                Open current PDF
            </a>
        </p>
    @endif
</section>

<div class="form-group">
    <label class="form-label" for="sort_order">Sort Order</label>
    <input type="number" id="sort_order" name="sort_order" class="form-input" min="0"
           value="{{ old('sort_order', optional($document ?? null)->sort_order ?? 0) }}">
    @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="published" name="published" value="1"
               {{ old('published', optional($document ?? null)->published ?? true) ? 'checked' : '' }}>
        <span>Published</span>
    </label>
    @error('published')<p class="form-error">{{ $message }}</p>@enderror
</div>
