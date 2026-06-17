@extends('layouts.app')

@section('title', 'Prospectus')
@section('page-title', 'Prospectus')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form admin-card--prospectus-form">
    <form method="POST" class="admin-form info-corner-form prospectus-form" action="{{ route('admin.settings.prospectus.update') }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="info-corner-form__layout prospectus-form__layout">
            <div class="info-corner-form__column info-corner-form__column--main">
                <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
                    <div class="info-corner-form__meta-row">
                        <div class="info-corner-form__meta-row-categories">
                            <span class="form-label">Prospectus Settings</span>
                            <p class="form-hint form-hint--tight prospectus-form__intro">
                                Manage the college prospectus PDF linked from the website header and footer.
                            </p>
                        </div>

                        <div class="info-corner-form__meta-row-scroller">
                            <label class="form-checkbox form-checkbox--compact" for="enabled">
                                <input
                                    type="checkbox"
                                    id="enabled"
                                    name="enabled"
                                    value="1"
                                    @checked(old('enabled', $setting['enabled'] ?? true))
                                >
                                <span>Show Prospectus link on the website</span>
                            </label>
                            @error('enabled')<p class="form-error">{{ $message }}</p>@enderror
                        </div>
                    </div>
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="label">Link Label</label>
                    <input
                        type="text"
                        id="label"
                        name="label"
                        class="form-input form-input--compact"
                        required
                        value="{{ old('label', $setting['label'] ?? 'Prospectus') }}"
                    >
                    @error('label')<p class="form-error">{{ $message }}</p>@enderror
                </section>
            </div>
        </div>

        <div class="info-corner-form__detail-block">
            <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
                <label class="form-label" for="pdf">Prospectus PDF</label>
                @include('components.media-picker', [
                    'id' => 'pdf',
                    'name' => 'pdf',
                    'libraryName' => 'pdf_library_path',
                    'type' => 'pdf',
                    'currentPath' => $setting['file_path'] ?? null,
                    'currentLabel' => $setting['file_name'] ?? null,
                    'hint' => 'PDF only — max '.round((int) config('uploads.types.pdf.max_size_kb') / 1024).' MB.',
                ])
                @if (!empty($setting['file_path']))
                    <p class="form-hint form-hint--tight">
                        <a href="{{ url('/api/v1/site-settings/prospectus/pdf') }}" target="_blank" rel="noopener">
                            Open current PDF
                        </a>
                    </p>
                @else
                    <p class="form-hint form-hint--tight">No PDF uploaded yet. The website uses a static fallback until a file is added.</p>
                @endif
            </section>
        </div>

        <div class="form-actions form-actions--compact prospectus-form__actions">
            <button type="submit" class="btn btn-primary">Save Settings</button>
        </div>
    </form>
</div>
@endsection
