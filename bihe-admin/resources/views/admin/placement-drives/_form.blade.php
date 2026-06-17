@php
    $drive = $placementDrive ?? null;
    $galleryImages = is_array($drive?->gallery_images) ? $drive->gallery_images : [];
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <label class="form-label" for="eyebrow">Card Eyebrow</label>
                    <input
                        type="text"
                        id="eyebrow"
                        name="eyebrow"
                        class="form-input form-input--compact"
                        placeholder="Campus to Corporate · Batch 1"
                        value="{{ old('eyebrow', $drive?->eyebrow ?? '') }}"
                    >
                    @error('eyebrow')<p class="form-error">{{ $message }}</p>@enderror
                </div>

                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="published">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            value="1"
                            @checked(old('published', $drive?->published ?? true))
                        >
                        <span>Show front</span>
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
                value="{{ old('title', $drive?->title ?? '') }}"
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
                value="{{ old('slug', $drive?->slug ?? '') }}"
            >
            <p class="form-hint form-hint--tight">Auto-generated from title if left blank.</p>
            @error('slug')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="hero_lead">Hero Lead</label>
            <textarea
                id="hero_lead"
                name="hero_lead"
                class="form-textarea form-input--compact"
                rows="3"
            >{{ old('hero_lead', $drive?->hero_lead ?? '') }}</textarea>
            @error('hero_lead')<p class="form-error">{{ $message }}</p>@enderror
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
                value="{{ old('event_date', $drive?->event_date?->format('Y-m-d')) }}"
            >
            @error('event_date')<p class="form-error">{{ $message }}</p>@enderror

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="date_label">Card Date Label</label>
                <input
                    type="text"
                    id="date_label"
                    name="date_label"
                    class="form-input form-input--compact"
                    placeholder="26 SEP"
                    value="{{ old('date_label', $drive?->date_label ?? '') }}"
                >
                @error('date_label')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="year_label">Card Year Label</label>
                <input
                    type="text"
                    id="year_label"
                    name="year_label"
                    class="form-input form-input--compact"
                    placeholder="2025"
                    value="{{ old('year_label', $drive?->year_label ?? '') }}"
                >
                @error('year_label')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="description">Card Description</label>
                <textarea
                    id="description"
                    name="description"
                    class="form-textarea form-input--compact"
                    rows="3"
                >{{ old('description', $drive?->description ?? '') }}</textarea>
                @error('description')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    class="form-input form-input--compact"
                    min="0"
                    value="{{ old('sort_order', $drive?->sort_order ?? 0) }}"
                >
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <div class="info-corner-form__detail-row">
            <section class="info-corner-form__section info-corner-form__section--editor info-corner-form__detail-col">
                <p class="info-corner-form__section-title">Detail Page — Section 1 (Intro)</p>
                <label class="form-label" for="intro_body">Intro Paragraphs</label>
                <textarea
                    id="intro_body"
                    name="intro_body"
                    class="form-textarea info-corner-form__editor js-rich-text"
                    data-rich-text
                    rows="8"
                >{{ old('intro_body', $drive?->intro_body ?? '') }}</textarea>
                @error('intro_body')<p class="form-error">{{ $message }}</p>@enderror
            </section>

            <div class="info-corner-form__detail-col">
                <section class="info-corner-form__section">
                    <p class="info-corner-form__section-title">Detail Page — Section 2 (Content + Gallery)</p>
                    <label class="form-label" for="section2_title">Section 2 Title</label>
                    <input
                        type="text"
                        id="section2_title"
                        name="section2_title"
                        class="form-input form-input--compact"
                        value="{{ old('section2_title', $drive?->section2_title ?? '') }}"
                    >
                    @error('section2_title')<p class="form-error">{{ $message }}</p>@enderror
                </section>

                <section class="info-corner-form__section info-corner-form__section--editor">
                    <label class="form-label" for="section2_body">Section 2 Paragraphs</label>
                    <textarea
                        id="section2_body"
                        name="section2_body"
                        class="form-textarea info-corner-form__editor js-rich-text"
                        data-rich-text
                        rows="8"
                    >{{ old('section2_body', $drive?->section2_body ?? '') }}</textarea>
                    @error('section2_body')<p class="form-error">{{ $message }}</p>@enderror
                </section>
            </div>
        </div>

        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="placement-drive-gallery">Gallery Images (carousel) @if(!empty($drive)) (add or remove) @endif</label>
            @include('components.placement-drive-gallery-picker', [
                'id' => 'placement-drive-gallery',
                'existingImages' => $galleryImages,
                'hint' => 'JPEG, PNG, GIF, WebP — max '.(int) config('uploads.types.image.max_size_kb').' KB each.',
            ])
        </section>
    </div>
</div>
