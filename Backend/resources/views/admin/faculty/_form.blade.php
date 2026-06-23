@php
    $member = $faculty ?? null;
    $selectedDepartments = old('departments', isset($faculty) ? $faculty->departmentSlugs() : ['b-com']);
    $departmentOptions = $departments ?? \App\Models\FacultyDepartment::active()->ordered()->get();
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <span class="form-label">Faculty Profile</span>
                    <p class="form-hint form-hint--tight">Core details shown on the public faculty pages.</p>
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
            <label class="form-label" for="designation">Designation</label>
            <input
                type="text"
                id="designation"
                name="designation"
                class="form-input form-input--compact"
                required
                value="{{ old('designation', $member?->designation ?? '') }}"
            >
            @error('designation')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="qualification">Qualification</label>
            <input
                type="text"
                id="qualification"
                name="qualification"
                class="form-input form-input--compact"
                value="{{ old('qualification', $member?->qualification ?? '') }}"
            >
            @error('qualification')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="experience">Experience</label>
            <input
                type="text"
                id="experience"
                name="experience"
                class="form-input form-input--compact"
                value="{{ old('experience', $member?->experience ?? '') }}"
                placeholder="24 Years"
            >
            @error('experience')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Display Order</label>
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

            <div class="info-corner-form__panel-field">
                <span class="form-label" id="departments-label">Section / Department</span>
                <p class="form-hint form-hint--tight">Select one or more sections where this member should appear.</p>
                <div class="info-corner-form__category-list" role="group" aria-labelledby="departments-label">
                    @foreach ($departmentOptions as $departmentOption)
                        <label class="form-checkbox form-checkbox--compact">
                            <input
                                type="checkbox"
                                name="departments[]"
                                value="{{ $departmentOption->slug }}"
                                {{ in_array($departmentOption->slug, $selectedDepartments, true) ? 'checked' : '' }}
                            >
                            <span>{{ $departmentOption->name }}</span>
                        </label>
                    @endforeach
                </div>
                @error('departments')<p class="form-error">{{ $message }}</p>@enderror
                @error('departments.*')<p class="form-error">{{ $message }}</p>@enderror
            </div>
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <div class="info-corner-form__detail-row">
            <section class="info-corner-form__section info-corner-form__section--editor info-corner-form__detail-col">
                <p class="info-corner-form__section-title">Profile — Seminar / Workshop</p>
                <label class="form-label" for="seminar_workshop">Seminar / Workshop</label>
                <textarea
                    id="seminar_workshop"
                    name="seminar_workshop"
                    class="form-textarea info-corner-form__editor js-rich-text"
                    data-rich-text
                    data-rich-text-height="220"
                    rows="8"
                >{{ old('seminar_workshop', $member?->seminar_workshop ?? '') }}</textarea>
                @error('seminar_workshop')<p class="form-error">{{ $message }}</p>@enderror
            </section>

            <section class="info-corner-form__section info-corner-form__section--editor info-corner-form__detail-col">
                <p class="info-corner-form__section-title">Profile — Subject Teaching</p>
                <label class="form-label" for="subject_teaching">Subject Teaching</label>
                <textarea
                    id="subject_teaching"
                    name="subject_teaching"
                    class="form-textarea info-corner-form__editor js-rich-text"
                    data-rich-text
                    data-rich-text-height="220"
                    rows="8"
                >{{ old('subject_teaching', $member?->subject_teaching ?? '') }}</textarea>
                @error('subject_teaching')<p class="form-error">{{ $message }}</p>@enderror
            </section>
        </div>

        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="photo">Photo @if(!empty($member)) (leave blank to keep current) @endif</label>
            @include('components.media-picker', [
                'id' => 'photo',
                'name' => 'photo',
                'libraryName' => 'photo_library_path',
                'type' => 'image',
                'currentPath' => $member?->photo_path,
                'required' => empty($member),
            ])
        </section>

        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="resume">Resume / Profile PDF</label>
            @include('components.media-picker', [
                'id' => 'resume',
                'name' => 'resume',
                'libraryName' => 'resume_library_path',
                'type' => 'pdf',
                'currentPath' => $member?->resume_path,
                'currentLabel' => $member?->resume_name,
                'hint' => 'PDF only — max '.(int) config('uploads.types.pdf.max_size_kb').' KB.',
            ])
            @if (!empty($member?->resume_path))
                <p class="form-hint form-hint--tight">
                    <a href="{{ route('admin.files.faculty-resume', $member) }}" target="_blank" rel="noopener">
                        Open current PDF
                    </a>
                </p>
            @endif
        </section>
    </div>
</div>
