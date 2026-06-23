@php
    $member = $governingBody ?? null;
    $savedParagraphs = old('paragraphs', $member?->paragraphs ?? []);
    $paragraphSlots = 6;
    $paragraphs = [];

    for ($index = 0; $index < $paragraphSlots; $index++) {
        $paragraphs[] = [
            'text' => $savedParagraphs[$index]['text'] ?? '',
            'emphasis' => (bool) ($savedParagraphs[$index]['emphasis'] ?? false),
        ];
    }

    $leftParagraphs = array_slice($paragraphs, 0, 3);
    $rightParagraphs = array_slice($paragraphs, 3, 3);
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <span class="form-label">Governing Body Member</span>
                    <p class="form-hint form-hint--tight">Profile details shown on the public governing bodies pages.</p>
                </div>

                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="published">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            value="1"
                            {{ old('published', $member?->published ?? true) ? 'checked' : '' }}
                        >
                        <span>Published</span>
                    </label>
                    @error('published')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            </div>
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                class="form-input form-input--compact"
                required
                value="{{ old('name', $member?->name ?? '') }}"
            >
            @error('name')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="slug">Slug (optional)</label>
            <input
                type="text"
                id="slug"
                name="slug"
                class="form-input form-input--compact"
                value="{{ old('slug', $member?->slug ?? '') }}"
                placeholder="auto-generated from name"
            >
            @error('slug')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title_line">Title Line</label>
            <input
                type="text"
                id="title_line"
                name="title_line"
                class="form-input form-input--compact"
                required
                value="{{ old('title_line', $member?->title_line ?? '') }}"
            >
            @error('title_line')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="qualifications">Qualifications / Role</label>
            <input
                type="text"
                id="qualifications"
                name="qualifications"
                class="form-input form-input--compact"
                required
                value="{{ old('qualifications', $member?->qualifications ?? '') }}"
            >
            @error('qualifications')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="badge">Section Badge</label>
            <input
                type="text"
                id="badge"
                name="badge"
                class="form-input form-input--compact"
                required
                value="{{ old('badge', $member?->badge ?? '') }}"
            >
            @error('badge')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title_lead">Quote — Lead Text</label>
            <input
                type="text"
                id="title_lead"
                name="title_lead"
                class="form-input form-input--compact"
                required
                value="{{ old('title_lead', $member?->title_lead ?? '') }}"
            >
            @error('title_lead')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title_accent">Quote — Accent Text</label>
            <input
                type="text"
                id="title_accent"
                name="title_accent"
                class="form-input form-input--compact"
                required
                value="{{ old('title_accent', $member?->title_accent ?? '') }}"
            >
            @error('title_accent')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="info-corner-form__panel-field">
                <label class="form-label" for="image_alt">Image Alt Text</label>
                <input
                    type="text"
                    id="image_alt"
                    name="image_alt"
                    class="form-input form-input--compact"
                    required
                    value="{{ old('image_alt', $member?->image_alt ?? '') }}"
                >
                @error('image_alt')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    class="form-input form-input--compact"
                    min="0"
                    value="{{ old('sort_order', $member?->sort_order ?? 0) }}"
                >
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <label class="form-checkbox form-checkbox--compact" for="reverse_layout">
                <input
                    type="checkbox"
                    id="reverse_layout"
                    name="reverse_layout"
                    value="1"
                    {{ old('reverse_layout', $member?->reverse_layout ?? false) ? 'checked' : '' }}
                >
                <span>Reverse layout (image on right)</span>
            </label>
            @error('reverse_layout')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <div class="info-corner-form__detail-row">
            <div class="info-corner-form__detail-col">
                <section class="info-corner-form__section">
                    <p class="info-corner-form__section-title">Message Paragraphs — 1 to 3</p>
                    @error('paragraphs')<p class="form-error">{{ $message }}</p>@enderror
                </section>

                @foreach ($leftParagraphs as $index => $paragraph)
                    <section class="info-corner-form__section info-corner-form__section--editor">
                        <label class="form-label" for="paragraphs_{{ $index }}_text">Paragraph {{ $index + 1 }}</label>
                        <textarea
                            id="paragraphs_{{ $index }}_text"
                            name="paragraphs[{{ $index }}][text]"
                            class="form-textarea info-corner-form__editor js-rich-text"
                            data-rich-text
                            data-rich-text-height="220"
                            rows="6"
                        >{{ $paragraph['text'] }}</textarea>
                        <label class="form-checkbox form-checkbox--compact">
                            <input type="hidden" name="paragraphs[{{ $index }}][emphasis]" value="0">
                            <input
                                type="checkbox"
                                name="paragraphs[{{ $index }}][emphasis]"
                                value="1"
                                {{ $paragraph['emphasis'] ? 'checked' : '' }}
                            >
                            <span>Emphasize first sentence</span>
                        </label>
                    </section>
                @endforeach
            </div>

            <div class="info-corner-form__detail-col">
                <section class="info-corner-form__section">
                    <p class="info-corner-form__section-title">Message Paragraphs — 4 to 6</p>
                    <p class="form-hint form-hint--tight">Leave unused paragraph fields blank.</p>
                </section>

                @foreach ($rightParagraphs as $offset => $paragraph)
                    @php $index = $offset + 3; @endphp
                    <section class="info-corner-form__section info-corner-form__section--editor">
                        <label class="form-label" for="paragraphs_{{ $index }}_text">Paragraph {{ $index + 1 }}</label>
                        <textarea
                            id="paragraphs_{{ $index }}_text"
                            name="paragraphs[{{ $index }}][text]"
                            class="form-textarea info-corner-form__editor js-rich-text"
                            data-rich-text
                            data-rich-text-height="220"
                            rows="6"
                        >{{ $paragraph['text'] }}</textarea>
                        <label class="form-checkbox form-checkbox--compact">
                            <input type="hidden" name="paragraphs[{{ $index }}][emphasis]" value="0">
                            <input
                                type="checkbox"
                                name="paragraphs[{{ $index }}][emphasis]"
                                value="1"
                                {{ $paragraph['emphasis'] ? 'checked' : '' }}
                            >
                            <span>Emphasize first sentence</span>
                        </label>
                    </section>
                @endforeach
            </div>
        </div>

        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="photo">Portrait Photo @if(empty($requirePhoto)) (leave blank to keep current) @endif</label>
            @include('components.media-picker', [
                'id' => 'photo',
                'name' => 'photo',
                'libraryName' => 'photo_library_path',
                'type' => 'image',
                'currentPath' => $member?->photo_path,
                'required' => !empty($requirePhoto),
            ])
        </section>
    </div>
</div>
