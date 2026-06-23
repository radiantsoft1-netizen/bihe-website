@php
    $pickerId = $id ?? 'placement-drive-gallery';
    $existingImages = collect($existingImages ?? []);
    $accept = 'image/jpeg,image/png,image/gif,image/webp';
    $supportsLabel = $hint ?? 'JPEG, PNG, GIF, WebP — max '.(int) config('uploads.types.image.max_size_kb').' KB each.';
    $hasExisting = $existingImages->isNotEmpty();
@endphp

<div
    class="media-picker media-picker--multi"
    data-media-picker
    data-media-picker-multiple
    data-media-type="image"
    data-input-id="{{ $pickerId }}"
    data-library-field="gallery_library_paths"
>
    <div class="media-picker__card">
        <p class="media-picker__heading">Upload your files:</p>

        <div class="media-picker__multi-layout">
            <div class="media-picker__dropzone" data-media-picker-dropzone>
                <div class="media-picker__empty" data-media-picker-empty>
                    <span class="media-picker__icon" aria-hidden="true">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="6" y="10" width="36" height="28" rx="4" fill="currentColor" opacity="0.18"/>
                            <path d="M6 32l10-9 8 7 7-6 11 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="34" cy="18" r="3.5" fill="currentColor"/>
                        </svg>
                    </span>
                    <p class="media-picker__title" data-media-picker-empty-title>
                        {{ $hasExisting ? 'Add more images from your computer' : 'Choose images from your computer' }}
                    </p>
                    <p class="media-picker__browse">
                        Hold <strong>Shift</strong> or <strong>Cmd/Ctrl</strong> to pick multiple files, or drag &amp; drop many images here.
                    </p>
                    <p class="media-picker__supports">{{ $supportsLabel }}</p>
                    <div class="media-picker__multi-actions">
                        <button type="button" class="media-picker__computer-btn" data-media-picker-upload>
                            Choose from Computer
                        </button>
                        <button type="button" class="media-picker__library-btn" data-media-picker-open>
                            Choose from Media Library
                        </button>
                    </div>
                </div>
            </div>

            <aside class="media-picker__multi-preview" aria-label="Selected images">
                <div class="media-picker__multi-preview-head">
                    <p class="media-picker__multi-preview-label">Selected images</p>
                    <span class="media-picker__multi-preview-count" data-media-picker-count>{{ $existingImages->count() }}</span>
                </div>

                <div
                    class="media-picker__multi-gallery"
                    data-media-picker-gallery
                    @if(!$hasExisting) hidden @endif
                >
                    @foreach ($existingImages as $image)
                        @php
                            $path = is_array($image) ? ($image['path'] ?? '') : '';
                        @endphp
                        @if ($path === '')
                            @continue
                        @endif
                        <div
                            class="media-picker__multi-item"
                            data-media-picker-item
                            data-existing-path="{{ $path }}"
                        >
                            <img
                                src="{{ \App\Support\StoredFileUrl::publicImage($path) }}"
                                alt=""
                                class="media-picker__multi-img"
                            >
                            <button
                                type="button"
                                class="media-picker__multi-remove"
                                data-media-picker-remove-item
                                aria-label="Remove image"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <input type="hidden" name="keep_gallery_paths[]" value="{{ $path }}">
                        </div>
                    @endforeach
                </div>

                <p
                    class="media-picker__multi-preview-empty"
                    data-media-picker-gallery-empty
                    @if($hasExisting) hidden @endif
                >
                    No images selected yet. Upload files or pick from the media library.
                </p>
            </aside>
        </div>
    </div>

    <div data-media-picker-library-mount></div>

    <input
        type="file"
        id="{{ $pickerId }}"
        name="images[]"
        class="media-picker__file"
        accept="{{ $accept }}"
        multiple
        hidden
    >

    @error('images')<p class="form-error">{{ $message }}</p>@enderror
    @error('images.*')<p class="form-error">{{ $message }}</p>@enderror
    @error('gallery_library_paths')<p class="form-error">{{ $message }}</p>@enderror
    @error('gallery_library_paths.*')<p class="form-error">{{ $message }}</p>@enderror
    @error('keep_gallery_paths')<p class="form-error">{{ $message }}</p>@enderror
    @error('keep_gallery_paths.*')<p class="form-error">{{ $message }}</p>@enderror
</div>
