@extends('layouts.app')

@section('title', 'Media Library')
@section('page-title', 'Media Library')

@push('head')
    <script>
        window.BIHE_MEDIA_LIBRARY_PAGE = {
            uploadUrl: @json(route('admin.media-library.upload')),
            filesUrl: @json(route('admin.media-library.files')),
            imageMaxKb: {{ $imageMaxKb }},
            pdfMaxKb: {{ $pdfMaxKb }},
            imageCategories: @json($imageCategories),
            pdfCategories: @json($pdfCategories),
        };
    </script>
@endpush

@push('scripts')
    <script src="{{ \App\Support\AdminAsset::url('assets/js/admin-media-library-page.js') }}" defer></script>
@endpush

@section('content')
<div
    class="admin-card media-library-page"
    data-media-library-page
    data-upload-url="{{ route('admin.media-library.upload') }}"
    data-files-url="{{ route('admin.media-library.files') }}"
    data-image-max-kb="{{ $imageMaxKb }}"
    data-pdf-max-kb="{{ $pdfMaxKb }}"
    data-image-categories='@json($imageCategories)'
    data-pdf-categories='@json($pdfCategories)'
>
    <div class="media-library-page__header">
        <div>
            <h2 class="media-library-page__title">Uploaded files</h2>
            <p class="media-library-page__subtitle">Browse, upload, and manage images and PDFs stored on the server.</p>
        </div>
        <div class="media-library-page__type-tabs" role="tablist" aria-label="File type">
            <button type="button" class="media-library-page__type-tab is-active" data-media-type-tab="image" role="tab" aria-selected="true">
                Images
            </button>
            <button type="button" class="media-library-page__type-tab" data-media-type-tab="pdf" role="tab" aria-selected="false">
                PDFs &amp; Documents
            </button>
        </div>
    </div>

    <div class="media-library-page__layout">
        <aside class="media-library-page__sidebar" aria-label="Upload categories">
            <p class="media-library-page__sidebar-label">Categories</p>
            <ul class="media-library-page__category-list" data-media-library-page-categories></ul>
        </aside>

        <div class="media-library-page__main">
            <section class="media-library-page__browse">
                <div class="media-library-page__browse-head">
                    <p class="media-library-page__browse-title" data-media-library-page-browse-title>Select a category to browse files</p>
                </div>

                <div class="media-library-page__gallery" data-media-library-page-gallery hidden></div>

                <p class="media-library-page__browse-empty" data-media-library-page-browse-empty hidden>
                    No files in this category yet. Upload files using the section below.
                </p>
            </section>

            <section class="media-library-page__upload media-picker__card">
                <p class="media-picker__heading" data-media-library-page-upload-heading>Upload your files:</p>

                <div class="media-picker__dropzone media-library-page__dropzone" data-media-library-page-dropzone>
                    <div class="media-picker__empty" data-media-library-page-empty>
                        <span class="media-picker__icon" data-media-library-page-icon aria-hidden="true">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="6" y="10" width="36" height="28" rx="4" fill="currentColor" opacity="0.18"/>
                                <path d="M6 32l10-9 8 7 7-6 11 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="34" cy="18" r="3.5" fill="currentColor"/>
                            </svg>
                        </span>
                        <p class="media-picker__title" data-media-library-page-drop-title>Select a category to upload files</p>
                        <p class="media-picker__browse" data-media-library-page-drop-hint hidden>
                            Hold <strong>Shift</strong> or <strong>Cmd/Ctrl</strong> to pick multiple files, or drag &amp; drop here.
                        </p>
                        <p class="media-picker__supports" data-media-library-page-supports></p>
                        <button type="button" class="media-picker__computer-btn" data-media-library-page-upload-trigger>
                            Choose from Computer
                        </button>
                    </div>
                </div>

                <p class="media-library-page__status" data-media-library-page-status hidden></p>
            </section>
        </div>
    </div>

    <input type="file" class="media-library-page__file-input" data-media-library-page-file-input hidden multiple>
</div>
@endsection
