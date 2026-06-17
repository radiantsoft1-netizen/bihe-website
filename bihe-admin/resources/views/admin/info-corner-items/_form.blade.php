@php
    $selectedCategories = old(
        'category_ids',
        isset($infoCornerItem)
            ? $infoCornerItem->categories->pluck('id')->all()
            : []
    );
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <span class="form-label" id="category-ids-label">
                        Categories <span class="form-label__required" aria-hidden="true">*</span>
                    </span>
                    @include('components.form-multi-select', [
                        'id' => 'category-ids',
                        'name' => 'category_ids[]',
                        'placeholder' => 'Select category (required)',
                        'required' => true,
                        'addNewUrl' => route('admin.info-corner-categories.create', ['return' => request()->fullUrl()]),
                        'addNewLabel' => 'Add new category',
                        'options' => ($categories ?? collect())->map(fn ($category) => [
                            'value' => $category->id,
                            'label' => $category->name,
                        ])->all(),
                        'selected' => $selectedCategories,
                    ])
                    @error('category_ids')<p class="form-error">{{ $message }}</p>@enderror
                    @error('category_ids.*')<p class="form-error">{{ $message }}</p>@enderror
                </div>

                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="show_in_home_scroller">
                        <input type="checkbox" id="show_in_home_scroller" name="show_in_home_scroller" value="1"
                               @checked(old('show_in_home_scroller', optional($infoCornerItem ?? null)->show_in_home_scroller ?? false))>
                        <span>Show in homepage scroller</span>
                    </label>
                    @error('show_in_home_scroller')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            </div>
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title">Title</label>
            <input type="text" id="title" name="title" class="form-input form-input--compact" required
                   value="{{ old('title', optional($infoCornerItem ?? null)->title ?? '') }}">
            @error('title')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section info-corner-form__section--editor">
            <label class="form-label" for="description-body">Description</label>
            <textarea
                id="description-body"
                name="body"
                class="form-textarea info-corner-form__editor js-rich-text"
                data-rich-text
                rows="8"
                placeholder="Enter the full description shown on the public Info Corner page."
            >{{ old('body', optional($infoCornerItem ?? null)->body ?? '') }}</textarea>
            @error('body')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="form-badge-head">
                <label class="form-label" for="published_date">Published Date</label>
                <label class="form-checkbox form-checkbox--compact" for="published">
                    <input type="checkbox" id="published" name="published" value="1"
                           @checked(old('published', optional($infoCornerItem ?? null)->published ?? true))>
                    <span>Show front</span>
                </label>
            </div>
            <input type="date" id="published_date" name="published_date" class="form-input form-input--compact"
                   value="{{ old('published_date', optional($infoCornerItem ?? null)->published_date?->format('Y-m-d') ?? now()->format('Y-m-d')) }}">
            @error('published_date')<p class="form-error">{{ $message }}</p>@enderror
            @error('published')<p class="form-error">{{ $message }}</p>@enderror

            <div class="form-badge-head form-label--spaced">
                <label class="form-label" for="badge_text">Badge text (optional)</label>
                <label class="form-checkbox form-checkbox--compact" for="badge_visible">
                    <input type="checkbox" id="badge_visible" name="badge_visible" value="1"
                           @checked(old('badge_visible', optional($infoCornerItem ?? null)->badge_visible ?? true))>
                    <span>Show badge</span>
                </label>
            </div>
            <input type="text" id="badge_text" name="badge_text" class="form-input form-input--compact" maxlength="30"
                   placeholder="e.g. New, Important, Notice"
                   value="{{ old('badge_text', optional($infoCornerItem ?? null)->badge_text ?? '') }}">
            @error('badge_text')<p class="form-error">{{ $message }}</p>@enderror
            @error('badge_visible')<p class="form-error">{{ $message }}</p>@enderror

            <div class="info-corner-form__panel-field info-corner-form__panel-field--media">
                <label class="form-label" for="pdf">PDF Attachment (optional)</label>
                @include('components.media-picker', [
                    'id' => 'pdf',
                    'name' => 'pdf',
                    'libraryName' => 'pdf_library_path',
                    'type' => 'pdf',
                    'currentPath' => optional($infoCornerItem ?? null)->pdf_path,
                    'currentLabel' => optional($infoCornerItem ?? null)->pdf_name,
                    'hint' => 'PDF only — max '.(int) config('uploads.types.pdf.max_size_kb').' KB.',
                ])
                @if (!empty(optional($infoCornerItem ?? null)->pdf_path))
                    <p class="form-hint form-hint--tight">
                        <a href="{{ route('admin.files.info-corner-item-pdf', optional($infoCornerItem ?? null)) }}" target="_blank" rel="noopener">
                            Open current PDF
                        </a>
                    </p>
                @endif
            </div>
        </section>
    </aside>

    <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
        <label class="form-label" for="image">Images @if(!empty($infoCornerItem)) (add or remove) @endif</label>
        @include('components.media-picker-multi', [
            'id' => 'images',
            'name' => 'images',
            'libraryName' => 'image_library_paths',
            'existingImages' => optional($infoCornerItem ?? null)->images ?? collect(),
            'hint' => 'JPEG, PNG, GIF, WebP — max '.(int) config('uploads.types.image.max_size_kb').' KB each.',
        ])
    </section>
</div>
