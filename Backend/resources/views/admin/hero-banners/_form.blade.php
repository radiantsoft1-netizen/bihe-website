<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section">
            <label class="form-label" for="eyebrow">Eyebrow</label>
            <input type="text" id="eyebrow" name="eyebrow" class="form-input form-input--compact" required
                   value="{{ old('eyebrow', optional($heroBanner ?? null)->eyebrow ?? '') }}"
                   placeholder="e.g. AICTE approved · Davangere University affiliated">
            @error('eyebrow')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title">Title</label>
            <input type="text" id="title" name="title" class="form-input form-input--compact" required
                   value="{{ old('title', optional($heroBanner ?? null)->title ?? '') }}">
            @error('title')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section info-corner-form__section--editor">
            <label class="form-label" for="subtitle">Subtitle</label>
            <textarea id="subtitle" name="subtitle" class="form-textarea info-corner-form__editor form-input--compact js-rich-text" data-rich-text data-rich-text-height="220" rows="4" aria-required="true">{{ old('subtitle', optional($heroBanner ?? null)->subtitle ?? '') }}</textarea>
            @error('subtitle')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input type="number" id="sort_order" name="sort_order" class="form-input form-input--compact" min="0"
                       value="{{ old('sort_order', optional($heroBanner ?? null)->sort_order ?? 0) }}">
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <label class="form-checkbox form-checkbox--compact" for="active">
                <input type="checkbox" id="active" name="active" value="1"
                       {{ old('active', optional($heroBanner ?? null)->active ?? true) ? 'checked' : '' }}>
                <span>Active</span>
            </label>
            @error('active')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="image">Background Image @if(empty($requireImage)) (leave blank to keep current) @endif</label>
            @include('components.media-picker', [
                'id' => 'image',
                'name' => 'image',
                'libraryName' => 'image_library_path',
                'type' => 'image',
                'currentPath' => optional($heroBanner ?? null)->image_path,
                'required' => !empty($requireImage),
            ])
        </section>
    </div>
</div>
