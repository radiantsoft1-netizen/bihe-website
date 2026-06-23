@php
    $pickerId = $id ?? $name;
    $libraryField = $libraryName ?? ($name.'_library_path');
    $accept = $type === 'pdf' ? 'application/pdf' : 'image/jpeg,image/png,image/gif,image/webp';
    $currentUrl = $currentPath ? ($currentUrl ?? \App\Support\StoredFileUrl::publicImage($currentPath)) : null;
    $isPdf = $type === 'pdf';
    $hasSelection = !empty($currentPath) || !empty(old($libraryField));
    $selectedName = $currentLabel ?? ($currentPath ? basename($currentPath) : '');
    $selectedDisplayName = $selectedName;
    if ($selectedDisplayName && preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\./i', $selectedDisplayName)) {
        $extension = strtoupper(pathinfo($selectedDisplayName, PATHINFO_EXTENSION));
        $selectedDisplayName = $isPdf ? "PDF document (.{$extension})" : "Image (.{$extension})";
    } elseif (strlen($selectedDisplayName) > 42) {
        $selectedDisplayName = substr($selectedDisplayName, 0, 18).'…'.substr($selectedDisplayName, -14);
    }
    $statusLabel = $isPdf ? 'PDF selected' : 'Image selected';
    $dropTitle = $isPdf ? 'Choose a PDF from your computer' : 'Choose an image from your computer';
    $supportsLabel = $hint ?? ($isPdf ? 'PDF — max '.(int) config('uploads.types.pdf.max_size_kb').' KB.' : 'JPEG, PNG, GIF, WebP — max '.(int) config('uploads.types.image.max_size_kb').' KB.');
    $previewLabel = $isPdf ? 'Selected file' : 'Selected image';
    $previewEmpty = $isPdf
        ? 'No file selected yet. Upload a PDF or pick from the media library.'
        : 'No image selected yet. Upload a file or pick from the media library.';
@endphp

<div
    class="media-picker media-picker--panel @if($isPdf) media-picker--pdf @endif"
    data-media-picker
    data-media-type="{{ $type }}"
    data-input-id="{{ $pickerId }}"
    data-library-field="{{ $libraryField }}"
>
    <div class="media-picker__card">
        @if ($isPdf)
            <div class="media-picker__dropzone" data-media-picker-dropzone>
                <div class="media-picker__empty" data-media-picker-empty @if($hasSelection) hidden @endif>
                    <span class="media-picker__icon" aria-hidden="true">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="6" width="32" height="36" rx="4" fill="currentColor" opacity="0.18"/>
                            <path d="M16 18h16M16 24h16M16 30h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <p class="media-picker__title">{{ $dropTitle }}</p>
                    <p class="media-picker__browse">or drag &amp; drop here.</p>
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

                <div class="media-picker__selected" data-media-picker-selected @if(!$hasSelection) hidden @endif>
                    <div class="media-picker__thumb" data-media-picker-thumb>
                        @if ($hasSelection)
                            <span class="media-picker__thumb-pdf">PDF</span>
                        @endif
                    </div>
                    <div class="media-picker__meta">
                        <div class="media-picker__meta-head">
                            <span class="media-picker__status-badge">{{ $statusLabel }}</span>
                            <p
                                class="media-picker__filename"
                                data-media-picker-filename
                                @if($selectedName) title="{{ $selectedName }}" @endif
                            >{{ $selectedDisplayName }}</p>
                        </div>
                        <div class="media-picker__change-actions">
                            <button type="button" class="media-picker__action media-picker__action--primary" data-media-picker-open>
                                <span class="media-picker__action-icon" aria-hidden="true">
                                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
                                        <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
                                        <path d="M3 13l3.5-3 3 2.5L13 9l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                Media Library
                            </button>
                            <button type="button" class="media-picker__action" data-media-picker-upload>
                                <span class="media-picker__action-icon" aria-hidden="true">
                                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 4v9M6.5 7.5 10 4l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4 14.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                Replace
                            </button>
                            <button type="button" class="media-picker__action media-picker__action--danger" data-media-picker-clear>
                                <span class="media-picker__action-icon" aria-hidden="true">
                                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 6h10M8 6V4.5A.5.5 0 0 1 8.5 4h3a.5.5 0 0 1 .5.5V6m1 0v9.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        @else
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
                        <p class="media-picker__title">{{ $dropTitle }}</p>
                        <p class="media-picker__browse">or drag &amp; drop here.</p>
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

                <aside class="media-picker__multi-preview" aria-label="{{ $previewLabel }}">
                    <div class="media-picker__multi-preview-head">
                        <p class="media-picker__multi-preview-label">{{ $previewLabel }}</p>
                        <span class="media-picker__multi-preview-count" data-media-picker-count>{{ $hasSelection ? 1 : 0 }}</span>
                    </div>

                    <div
                        class="media-picker__selected media-picker__selected--panel"
                        data-media-picker-selected
                        @if(!$hasSelection) hidden @endif
                    >
                        <div class="media-picker__thumb" data-media-picker-thumb>
                            @if ($hasSelection && $currentUrl)
                                <img src="{{ $currentUrl }}" alt="" class="media-picker__thumb-img">
                            @endif
                        </div>
                        <div class="media-picker__meta">
                            <div class="media-picker__meta-head">
                                <span class="media-picker__status-badge">{{ $statusLabel }}</span>
                                <p
                                    class="media-picker__filename"
                                    data-media-picker-filename
                                    @if($selectedName) title="{{ $selectedName }}" @endif
                                >{{ $selectedDisplayName }}</p>
                            </div>
                            <div class="media-picker__change-actions">
                                <button type="button" class="media-picker__action media-picker__action--primary" data-media-picker-open>
                                    <span class="media-picker__action-icon" aria-hidden="true">
                                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
                                            <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
                                            <path d="M3 13l3.5-3 3 2.5L13 9l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    Media Library
                                </button>
                                <button type="button" class="media-picker__action" data-media-picker-upload>
                                    <span class="media-picker__action-icon" aria-hidden="true">
                                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 4v9M6.5 7.5 10 4l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4 14.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </span>
                                    Replace
                                </button>
                                <button type="button" class="media-picker__action media-picker__action--danger" data-media-picker-clear>
                                    <span class="media-picker__action-icon" aria-hidden="true">
                                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 6h10M8 6V4.5A.5.5 0 0 1 8.5 4h3a.5.5 0 0 1 .5.5V6m1 0v9.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <p
                        class="media-picker__multi-preview-empty"
                        data-media-picker-preview-empty
                        @if($hasSelection) hidden @endif
                    >
                        {{ $previewEmpty }}
                    </p>
                </aside>
            </div>
        @endif
    </div>

    <input
        type="hidden"
        name="{{ $libraryField }}"
        id="{{ $libraryField }}"
        value="{{ old($libraryField, '') }}"
        data-media-library-path
    >

    <input
        type="file"
        id="{{ $pickerId }}"
        name="{{ $name }}"
        class="media-picker__file"
        accept="{{ $accept }}"
        @if(!empty($required)) required @endif
        hidden
    >

    @error($name)<p class="form-error">{{ $message }}</p>@enderror
    @error($libraryField)<p class="form-error">{{ $message }}</p>@enderror
</div>
