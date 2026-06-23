<div class="form-group">
    <label class="form-label" for="title">Title</label>
    <input type="text" id="title" name="title" class="form-input" required
           value="{{ old('title', optional($newsEvent ?? null)->title ?? '') }}">
    @error('title')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="slug">Slug (optional)</label>
    <input type="text" id="slug" name="slug" class="form-input"
           value="{{ old('slug', optional($newsEvent ?? null)->slug ?? '') }}">
    <p class="form-hint">Auto-generated from title if left blank.</p>
    @error('slug')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="news_category_id">Category</label>
    <select id="news_category_id" name="news_category_id" class="form-input">
        <option value="">— Select category —</option>
        @foreach (($categories ?? collect()) as $category)
            <option value="{{ $category->id }}"
                @selected((string) old('news_category_id', optional($newsEvent ?? null)->news_category_id) === (string) $category->id)>
                {{ $category->name }}
            </option>
        @endforeach
    </select>
    @error('news_category_id')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="summary">Description</label>
    <textarea id="summary" name="summary" class="form-textarea js-rich-text" data-rich-text data-rich-text-height="220" rows="4">{{ old('summary', optional($newsEvent ?? null)->summary ?? '') }}</textarea>
    @error('summary')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="event_date">Event Date</label>
    <input type="date" id="event_date" name="event_date" class="form-input"
           value="{{ old('event_date', optional($newsEvent ?? null)->event_date?->format('Y-m-d')) }}">
    @error('event_date')<p class="form-error">{{ $message }}</p>@enderror
</div>

<section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images form-group--media">
    <label class="form-label" for="image">Featured Image @if(!empty($newsEvent)) (leave blank to keep current) @endif</label>
    @include('components.media-picker', [
        'id' => 'image',
        'name' => 'image',
        'libraryName' => 'image_library_path',
        'type' => 'image',
        'currentPath' => optional($newsEvent ?? null)->image_path,
    ])
</section>

<section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images form-group--media">
    <label class="form-label" for="pdf">PDF Attachment @if(!empty($newsEvent)) (leave blank to keep current) @endif</label>
    @include('components.media-picker', [
        'id' => 'pdf',
        'name' => 'pdf',
        'libraryName' => 'pdf_library_path',
        'type' => 'pdf',
        'currentPath' => optional($newsEvent ?? null)->pdf_path,
        'currentLabel' => optional($newsEvent ?? null)->pdf_name,
    ])
    @if (!empty(optional($newsEvent ?? null)->pdf_path))
        <p class="form-hint form-hint--tight">
            <a href="{{ route('admin.files.news-pdf', optional($newsEvent ?? null)) }}" target="_blank" rel="noopener">
                Open current PDF
            </a>
        </p>
    @endif
</section>

<div class="form-group">
    <label class="form-label" for="sort_order">Sort Order</label>
    <input type="number" id="sort_order" name="sort_order" class="form-input" min="0"
           value="{{ old('sort_order', optional($newsEvent ?? null)->sort_order ?? 0) }}">
    @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="published" name="published" value="1"
               {{ old('published', optional($newsEvent ?? null)->published ?? true) ? 'checked' : '' }}>
        <span>Published</span>
    </label>
    @error('published')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="is_featured" name="is_featured" value="1"
               {{ old('is_featured', optional($newsEvent ?? null)->is_featured ?? false) ? 'checked' : '' }}>
        <span>Featured on homepage</span>
    </label>
    @error('is_featured')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-checkbox">
        <input type="checkbox" id="show_in_ticker" name="show_in_ticker" value="1"
               {{ old('show_in_ticker', optional($newsEvent ?? null)->show_in_ticker ?? false) ? 'checked' : '' }}>
        <span>Show in homepage news ticker</span>
    </label>
    @error('show_in_ticker')<p class="form-error">{{ $message }}</p>@enderror
</div>

<hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--bihe-border);">

<p class="form-hint" style="margin-bottom:1rem;">SEO fields are auto-generated from title and description when left blank.</p>

<div class="form-group">
    <label class="form-label" for="seo_title">SEO Title</label>
    <input type="text" id="seo_title" name="seo_title" class="form-input"
           value="{{ old('seo_title', optional($newsEvent ?? null)->seo_title ?? '') }}">
    @error('seo_title')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="seo_description">SEO Description</label>
    <textarea id="seo_description" name="seo_description" class="form-textarea js-rich-text" data-rich-text data-rich-text-height="220" rows="3">{{ old('seo_description', optional($newsEvent ?? null)->seo_description ?? '') }}</textarea>
    @error('seo_description')<p class="form-error">{{ $message }}</p>@enderror
</div>

<div class="form-group">
    <label class="form-label" for="seo_keywords">SEO Keywords</label>
    <input type="text" id="seo_keywords" name="seo_keywords" class="form-input"
           value="{{ old('seo_keywords', optional($newsEvent ?? null)->seo_keywords ?? '') }}">
    @error('seo_keywords')<p class="form-error">{{ $message }}</p>@enderror
</div>
