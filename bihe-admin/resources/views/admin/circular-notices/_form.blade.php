@php
    $notice = $circularNotice ?? null;
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <span class="form-label">Circular Notice</span>
                    <p class="form-hint form-hint--tight">Title, summary, and body shown on the public circular notices pages.</p>
                </div>

                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="published">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            value="1"
                            @checked(old('published', $notice?->published ?? true))
                        >
                        <span>Published</span>
                    </label>
                    @error('published')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            </div>
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                class="form-input form-input--compact"
                required
                value="{{ old('title', $notice?->title ?? '') }}"
            >
            @error('title')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="slug">Slug (optional)</label>
            <input
                type="text"
                id="slug"
                name="slug"
                class="form-input form-input--compact"
                value="{{ old('slug', $notice?->slug ?? '') }}"
            >
            <p class="form-hint form-hint--tight">Auto-generated from title if left blank.</p>
            @error('slug')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="subtitle">Subtitle (optional)</label>
            <input
                type="text"
                id="subtitle"
                name="subtitle"
                class="form-input form-input--compact"
                value="{{ old('subtitle', $notice?->subtitle ?? '') }}"
            >
            @error('subtitle')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section info-corner-form__section--editor">
            <label class="form-label" for="excerpt">Excerpt</label>
            <textarea
                id="excerpt"
                name="excerpt"
                class="form-textarea info-corner-form__editor js-rich-text"
                data-rich-text
                rows="4"
            >{{ old('excerpt', $notice?->excerpt ?? '') }}</textarea>
            @error('excerpt')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="form-badge-head">
                <label class="form-label" for="published_date">Published Date</label>
            </div>
            <input
                type="date"
                id="published_date"
                name="published_date"
                class="form-input form-input--compact"
                value="{{ old('published_date', $notice?->published_date?->format('Y-m-d')) }}"
            >
            @error('published_date')<p class="form-error">{{ $message }}</p>@enderror

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    class="form-input form-input--compact"
                    min="0"
                    value="{{ old('sort_order', $notice?->sort_order ?? 0) }}"
                >
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="image_alt">Image Alt Text</label>
                <input
                    type="text"
                    id="image_alt"
                    name="image_alt"
                    class="form-input form-input--compact"
                    value="{{ old('image_alt', $notice?->image_alt ?? '') }}"
                >
                @error('image_alt')<p class="form-error">{{ $message }}</p>@enderror
            </div>
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <section class="info-corner-form__section info-corner-form__section--editor">
            <p class="info-corner-form__section-title">Notice Content</p>
            <label class="form-label" for="rich-text-body">Content</label>
            <textarea
                id="rich-text-body"
                name="body"
                class="form-textarea info-corner-form__editor js-rich-text"
                data-rich-text
                rows="10"
            >{{ old('body', $notice?->body ?? '') }}</textarea>
            @error('body')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="image">Notice Image @if(!empty($notice)) (leave blank to keep current) @endif</label>
            @include('components.media-picker', [
                'id' => 'image',
                'name' => 'image',
                'libraryName' => 'image_library_path',
                'type' => 'image',
                'currentPath' => $notice?->image_path,
            ])
        </section>

        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="pdf">PDF Attachment (optional)</label>
            @include('components.media-picker', [
                'id' => 'pdf',
                'name' => 'pdf',
                'libraryName' => 'pdf_library_path',
                'type' => 'pdf',
                'currentPath' => $notice?->pdf_path,
                'currentLabel' => $notice?->pdf_name,
            ])
            @if (!empty($notice?->pdf_path))
                <p class="form-hint form-hint--tight">
                    <a href="{{ route('admin.files.circular-notice-pdf', $notice) }}" target="_blank" rel="noopener">
                        Open current PDF
                    </a>
                </p>
            @endif
        </section>
    </div>
</div>
