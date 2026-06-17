@php
    use App\Support\SitePageRdcDefaults;

    $savedContent = is_array($page?->content) ? $page->content : [];
    $rdcProjects = SitePageRdcDefaults::resolveProjects(
        old('projects')
            ? ['projects' => collect(old('projects'))->values()->all()]
            : $savedContent,
    );
@endphp

<section class="info-corner-form__section">
    <p class="info-corner-form__section-title">Research &amp; Development Projects</p>
    <p class="form-hint form-hint--tight">
        Edit each project&apos;s title, category, images, <strong>Aim</strong>, and <strong>Conclusion</strong>.
        Leave an image blank to keep the current upload, or keep it empty to use the website&apos;s built-in default image.
    </p>
    @error('projects')<p class="form-error">{{ $message }}</p>@enderror
</section>

@foreach ($rdcProjects as $index => $project)
    <div @class(['rdc-project-form', 'rdc-project-form--spaced' => ! $loop->last])>
        <input type="hidden" name="projects[{{ $index }}][id]" value="{{ $project['id'] }}">

        <div class="info-corner-form__layout">
            <div class="info-corner-form__column info-corner-form__column--main">
                <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
                    <div class="info-corner-form__meta-row">
                        <div class="info-corner-form__meta-row-categories">
                            <span class="form-label">Project {{ $index + 1 }}</span>
                            <p class="form-hint form-hint--tight">{{ $project['id'] }}</p>
                        </div>
                    </div>
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="projects_{{ $index }}_title">Project Title</label>
                    <input
                        type="text"
                        id="projects_{{ $index }}_title"
                        name="projects[{{ $index }}][title]"
                        class="form-input form-input--compact"
                        value="{{ $project['title'] }}"
                    >
                    @error("projects.$index.title")<p class="form-error">{{ $message }}</p>@enderror
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="projects_{{ $index }}_category">Category</label>
                    <input
                        type="text"
                        id="projects_{{ $index }}_category"
                        name="projects[{{ $index }}][category]"
                        class="form-input form-input--compact"
                        value="{{ $project['category'] }}"
                        placeholder="e.g. Web Application"
                    >
                    @error("projects.$index.category")<p class="form-error">{{ $message }}</p>@enderror
                </section>
            </div>

            </div>

            <div class="info-corner-form__detail-block">
                <div class="info-corner-form__detail-row">
                    <section class="info-corner-form__section info-corner-form__section--editor info-corner-form__detail-col">
                        <p class="info-corner-form__section-title">Project Content — Aim</p>
                        <label class="form-label" for="projects_{{ $index }}_aim">Aim</label>
                        <textarea
                            id="projects_{{ $index }}_aim"
                            name="projects[{{ $index }}][aim]"
                            class="form-textarea info-corner-form__editor js-rich-text"
                            data-rich-text
                            rows="8"
                        >{{ $project['aim'] }}</textarea>
                        @error("projects.$index.aim")<p class="form-error">{{ $message }}</p>@enderror
                    </section>

                    <section class="info-corner-form__section info-corner-form__section--editor info-corner-form__detail-col">
                        <p class="info-corner-form__section-title">Project Content — Conclusion</p>
                        <label class="form-label" for="projects_{{ $index }}_conclusion">Conclusion</label>
                        <textarea
                            id="projects_{{ $index }}_conclusion"
                            name="projects[{{ $index }}][conclusion]"
                            class="form-textarea info-corner-form__editor js-rich-text"
                            data-rich-text
                            rows="8"
                        >{{ $project['conclusion'] }}</textarea>
                        @error("projects.$index.conclusion")<p class="form-error">{{ $message }}</p>@enderror
                    </section>
                </div>

                @foreach ($project['images'] as $imageIndex => $image)
                    @php
                        $imageNumber = $imageIndex + 1;
                        $imagePath = $image['path'] ?? '';
                        $fileField = "projects[{$index}][images][{$imageIndex}][file]";
                        $libraryField = "projects[{$index}][images][{$imageIndex}][file_library_path]";
                    @endphp

                    <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
                        <label class="form-label" for="projects_{{ $index }}_image_{{ $imageIndex }}_file">
                            Project Image {{ $imageNumber }} @if($imagePath !== '') (leave blank to keep current) @endif
                        </label>

                        @if ($imagePath !== '')
                            <input type="hidden" name="projects[{{ $index }}][images][{{ $imageIndex }}][path]" value="{{ $imagePath }}">
                        @else
                            <p class="form-hint form-hint--tight">No uploaded image yet. The website will use its default image until you upload one here.</p>
                        @endif

                        @include('components.media-picker', [
                            'id' => "projects_{$index}_image_{$imageIndex}_file",
                            'name' => $fileField,
                            'libraryName' => $libraryField,
                            'type' => 'image',
                            'currentPath' => $imagePath !== '' ? $imagePath : null,
                        ])

                        <label class="form-label" for="projects_{{ $index }}_image_{{ $imageIndex }}_alt">Image Alt Text</label>
                        <input
                            type="text"
                            id="projects_{{ $index }}_image_{{ $imageIndex }}_alt"
                            name="projects[{{ $index }}][images][{{ $imageIndex }}][alt]"
                            class="form-input form-input--compact"
                            value="{{ $image['alt'] }}"
                        >
                        @error("projects.$index.images.$imageIndex.alt")<p class="form-error">{{ $message }}</p>@enderror
                    </section>
                @endforeach
            </div>
        </div>
    </div>
@endforeach
