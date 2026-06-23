@php
    use App\Support\SitePageFormContent;

    $page = $sitePage ?? null;
    $savedContent = SitePageFormContent::resolve($page);
    $savedParagraphs = old('paragraphs', $savedContent['paragraphs']);
    $paragraphSlots = 8;
    $paragraphs = [];

    for ($index = 0; $index < $paragraphSlots; $index++) {
        $paragraphs[] = is_string($savedParagraphs[$index] ?? null)
            ? $savedParagraphs[$index]
            : '';
    }

    $templateKey = old('template_key', $page?->template_key ?? '');
    $isRdcTemplate = $templateKey === 'research-development-cell';
    $hasRdcProjects = ! empty($page?->content['projects']) || $isRdcTemplate;
    $hasSavedContent = trim($savedContent['lead']) !== ''
        || $savedContent['currentPage'] !== ''
        || $savedContent['introBadge'] !== ''
        || $savedContent['introTitle'] !== ''
        || $savedContent['paragraphs'] !== []
        || $hasRdcProjects;
    $hasImportDefaults = $page
        ? app(\App\Services\SitePageContentImportService::class)->hasImportDefaults($page->path)
        : false;
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <span class="form-label">Site Page</span>
                    @if ($page)
                        <p class="form-hint form-hint--tight">
                            Editing <code>{{ $page->path }}</code>
                            @if ($page->template_key)
                                · template: <code>{{ $page->template_key }}</code>
                            @endif
                        </p>
                    @else
                        <p class="form-hint form-hint--tight">Path, title, and content shown on the public website.</p>
                    @endif
                </div>

                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="published">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            value="1"
                            @checked(old('published', $page?->published ?? true))
                        >
                        <span>Published</span>
                    </label>
                    @error('published')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            </div>
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="path">Path</label>
            <input
                type="text"
                id="path"
                name="path"
                class="form-input form-input--compact"
                required
                value="{{ old('path', $page?->path ?? '') }}"
                placeholder="/academics/bca"
            >
            @error('path')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title">Page Title</label>
            <input
                type="text"
                id="title"
                name="title"
                class="form-input form-input--compact"
                required
                value="{{ old('title', $page?->title ?? '') }}"
            >
            @error('title')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="meta_description">Meta Description</label>
            <input
                type="text"
                id="meta_description"
                name="meta_description"
                class="form-input form-input--compact"
                value="{{ old('meta_description', $page?->meta_description ?? '') }}"
            >
            @error('meta_description')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        @if ($page && ! $hasSavedContent)
            <section class="info-corner-form__section info-corner-form__section--panel site-page-form__import-banner">
                <p class="form-hint form-hint--tight" style="margin:0;">
                    @if ($hasImportDefaults)
                        No CMS content is saved for this page yet. Load the current website text into the fields below, or enter content manually.
                    @else
                        This page uses a custom layout and has no imported paragraph defaults. Fill in the fields below to add CMS content.
                    @endif
                </p>
                @if ($hasImportDefaults)
                    <button
                        type="submit"
                        class="btn btn-outline btn-sm"
                        formaction="{{ route('admin.site-pages.import-content', $page) }}"
                        formmethod="post"
                    >
                        Load website content
                    </button>
                @endif
            </section>
        @endif

        @if (! $isRdcTemplate)
            <section class="info-corner-form__section info-corner-form__section--editor">
                <p class="info-corner-form__section-title">Page Content</p>
                <label class="form-label" for="content_lead">Hero Lead / Summary</label>
                <textarea
                    id="content_lead"
                    name="content_lead"
                    class="form-textarea info-corner-form__editor js-rich-text"
                    data-rich-text
                    data-rich-text-height="220"
                    rows="4"
                >{{ old('content_lead', $savedContent['lead']) }}</textarea>
                @error('content_lead')<p class="form-error">{{ $message }}</p>@enderror
            </section>
        @endif

        @if ($isRdcTemplate)
            <section class="info-corner-form__section info-corner-form__section--panel">
                <p class="form-hint form-hint--tight" style="margin:0;">
                    The page hero stays fixed on the website. Manage each project&apos;s title, category, images, Aim, and Conclusion in the section below.
                </p>
            </section>
        @endif
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="info-corner-form__panel-field">
                <label class="form-label" for="slug">Slug (optional)</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    class="form-input form-input--compact"
                    value="{{ old('slug', $page?->slug ?? '') }}"
                >
                @error('slug')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="section">Section</label>
                <input
                    type="text"
                    id="section"
                    name="section"
                    class="form-input form-input--compact"
                    value="{{ old('section', $page?->section ?? '') }}"
                    placeholder="academics"
                >
                @error('section')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="template_key">Template Key</label>
                <input
                    type="text"
                    id="template_key"
                    name="template_key"
                    class="form-input form-input--compact"
                    required
                    value="{{ old('template_key', $page?->template_key ?? '') }}"
                    placeholder="bca-academics"
                >
                @error('template_key')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Sort Order</label>
                <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    class="form-input form-input--compact"
                    min="0"
                    value="{{ old('sort_order', $page?->sort_order ?? 0) }}"
                >
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            @if (! $isRdcTemplate)
                <div class="info-corner-form__panel-field">
                    <label class="form-label" for="content_current_page">Breadcrumb Label</label>
                    <input
                        type="text"
                        id="content_current_page"
                        name="content_current_page"
                        class="form-input form-input--compact"
                        value="{{ old('content_current_page', $savedContent['currentPage']) }}"
                        placeholder="e.g. Computer Lab"
                    >
                    @error('content_current_page')<p class="form-error">{{ $message }}</p>@enderror
                </div>

                <div class="info-corner-form__panel-field">
                    <label class="form-label" for="content_intro_badge">Section Badge</label>
                    <input
                        type="text"
                        id="content_intro_badge"
                        name="content_intro_badge"
                        class="form-input form-input--compact"
                        value="{{ old('content_intro_badge', $savedContent['introBadge']) }}"
                        placeholder="e.g. Student Life"
                    >
                    @error('content_intro_badge')<p class="form-error">{{ $message }}</p>@enderror
                </div>

                <div class="info-corner-form__panel-field">
                    <label class="form-label" for="content_intro_title">Intro Heading</label>
                    <input
                        type="text"
                        id="content_intro_title"
                        name="content_intro_title"
                        class="form-input form-input--compact"
                        value="{{ old('content_intro_title', $savedContent['introTitle']) }}"
                        placeholder="Heading above the main paragraphs"
                    >
                    @error('content_intro_title')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            @endif
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        @if ($isRdcTemplate)
            @include('admin.site-pages._rdc-projects', ['page' => $page])
        @else
            <section class="info-corner-form__section">
                <p class="info-corner-form__section-title">Page Paragraphs</p>
                <p class="form-hint form-hint--tight">Use the editor for formatted text, lists, links, and images. Leave unused fields blank.</p>
                @error('paragraphs')<p class="form-error">{{ $message }}</p>@enderror
            </section>

            <div class="info-corner-form__detail-row">
                <div class="info-corner-form__detail-col">
                    @foreach (array_slice($paragraphs, 0, 4) as $index => $paragraph)
                        <section class="info-corner-form__section info-corner-form__section--editor">
                            <label class="form-label" for="paragraphs_{{ $index }}">Paragraph {{ $index + 1 }}</label>
                            <textarea
                                id="paragraphs_{{ $index }}"
                                name="paragraphs[{{ $index }}]"
                                class="form-textarea info-corner-form__editor js-rich-text"
                                data-rich-text
                                data-rich-text-height="220"
                                rows="6"
                            >{{ $paragraph }}</textarea>
                            @error("paragraphs.$index")<p class="form-error">{{ $message }}</p>@enderror
                        </section>
                    @endforeach
                </div>

                <div class="info-corner-form__detail-col">
                    @foreach (array_slice($paragraphs, 4, 4) as $offset => $paragraph)
                        @php $index = $offset + 4; @endphp
                        <section class="info-corner-form__section info-corner-form__section--editor">
                            <label class="form-label" for="paragraphs_{{ $index }}">Paragraph {{ $index + 1 }}</label>
                            <textarea
                                id="paragraphs_{{ $index }}"
                                name="paragraphs[{{ $index }}]"
                                class="form-textarea info-corner-form__editor js-rich-text"
                                data-rich-text
                                data-rich-text-height="220"
                                rows="6"
                            >{{ $paragraph }}</textarea>
                            @error("paragraphs.$index")<p class="form-error">{{ $message }}</p>@enderror
                        </section>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
</div>
