<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section">
            <label class="form-label" for="name">Company Name</label>
            <input type="text" id="name" name="name" class="form-input form-input--compact" required
                   value="{{ old('name', optional($recruitingPartner ?? null)->name ?? '') }}">
            @error('name')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input type="number" id="sort_order" name="sort_order" class="form-input form-input--compact" min="0"
                       value="{{ old('sort_order', optional($recruitingPartner ?? null)->sort_order ?? 0) }}">
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <label class="form-checkbox form-checkbox--compact" for="active">
                <input type="checkbox" id="active" name="active" value="1"
                       {{ old('active', optional($recruitingPartner ?? null)->active ?? true) ? 'checked' : '' }}>
                <span>Active</span>
            </label>
            @error('active')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="logo">Logo @if(empty($requireLogo)) (leave blank to keep current) @endif</label>
            @include('components.media-picker', [
                'id' => 'logo',
                'name' => 'logo',
                'libraryName' => 'logo_library_path',
                'type' => 'image',
                'currentPath' => optional($recruitingPartner ?? null)->logo_path,
                'required' => !empty($requireLogo),
            ])
        </section>
    </div>
</div>
