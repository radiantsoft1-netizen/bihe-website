<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--editor">
            <label class="form-label" for="message">Message</label>
            <textarea id="message" name="message" class="form-textarea form-input--compact info-corner-form__editor js-rich-text" data-rich-text data-rich-text-height="220" rows="5" aria-required="true">{{ old('message', optional($announcement ?? null)->message) }}</textarea>
            @error('message')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="link">Link (optional)</label>
            <input type="text" id="link" name="link" class="form-input form-input--compact" inputmode="url"
                   value="{{ old('link', optional($announcement ?? null)->link) }}" placeholder="https://">
            <p class="form-hint form-hint--tight">Full URL including https://</p>
            @error('link')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <label class="form-checkbox form-checkbox--compact" for="active">
                <input type="checkbox" id="active" name="active" value="1"
                       {{ old('active', optional($announcement ?? null)->active ?? true) ? 'checked' : '' }}>
                <span>Active</span>
            </label>
            @error('active')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </aside>
</div>
