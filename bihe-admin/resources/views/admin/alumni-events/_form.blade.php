@php
    $event = $event ?? null;
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="published">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            value="1"
                            @checked(old('published', $event?->published ?? true))
                        >
                        <span>Show on website</span>
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
                value="{{ old('title', $event?->title ?? '') }}"
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
                value="{{ old('slug', $event?->slug ?? '') }}"
            >
            <p class="form-hint form-hint--tight">Auto-generated from title if left blank.</p>
            @error('slug')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="summary">Summary</label>
            <textarea
                id="summary"
                name="summary"
                class="form-textarea form-input--compact"
                rows="3"
            >{{ old('summary', $event?->summary ?? '') }}</textarea>
            @error('summary')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section info-corner-form__section--editor">
            <label class="form-label" for="body">Event Details</label>
            <textarea
                id="body"
                name="body"
                class="form-textarea info-corner-form__editor js-rich-text"
                data-rich-text
                rows="8"
            >{{ old('body', $event?->body ?? '') }}</textarea>
            @error('body')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="form-badge-head">
                <label class="form-label" for="event_date">Event Date</label>
            </div>
            <input
                type="date"
                id="event_date"
                name="event_date"
                class="form-input form-input--compact"
                value="{{ old('event_date', $event?->event_date?->format('Y-m-d')) }}"
            >
            @error('event_date')<p class="form-error">{{ $message }}</p>@enderror

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="venue">Venue</label>
                <input
                    type="text"
                    id="venue"
                    name="venue"
                    class="form-input form-input--compact"
                    value="{{ old('venue', $event?->venue ?? '') }}"
                >
                @error('venue')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    class="form-input form-input--compact"
                    min="0"
                    value="{{ old('sort_order', $event?->sort_order ?? 0) }}"
                >
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="image">Event Image @if(!empty($event)) (leave blank to keep current) @endif</label>
            @include('components.media-picker', [
                'id' => 'image',
                'name' => 'image',
                'libraryName' => 'image_library_path',
                'type' => 'image',
                'currentPath' => $event?->image_path,
                'hint' => 'JPEG, PNG, GIF, or WebP — max '.(int) config('uploads.types.image.max_size_kb').' KB.',
            ])
        </section>
    </div>
</div>
