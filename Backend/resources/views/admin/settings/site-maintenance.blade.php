@extends('layouts.app')

@section('title', 'Website Maintenance')
@section('page-title', 'Website Maintenance')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form admin-card--prospectus-form">
    <form method="POST" class="admin-form info-corner-form prospectus-form" action="{{ route('admin.settings.site-maintenance.update') }}">
        @csrf
        @method('PUT')

        <div class="info-corner-form__layout prospectus-form__layout">
            <div class="info-corner-form__column info-corner-form__column--main">
                <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
                    <div class="info-corner-form__meta-row">
                        <div class="info-corner-form__meta-row-categories">
                            <span class="form-label">Public Website Gate</span>
                            <p class="form-hint form-hint--tight prospectus-form__intro">
                                When enabled, visitors see a maintenance or staging page instead of the public website.
                                The admin panel and API stay available.
                            </p>
                        </div>

                        <div class="info-corner-form__meta-row-scroller">
                            <label class="form-checkbox form-checkbox--compact" for="enabled">
                                <input
                                    type="checkbox"
                                    id="enabled"
                                    name="enabled"
                                    value="1"
                                    @checked(old('enabled', $setting['enabled'] ?? false))
                                >
                                <span>Enable maintenance / staging page</span>
                            </label>
                            @error('enabled')<p class="form-error">{{ $message }}</p>@enderror
                        </div>
                    </div>
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="mode">Page type</label>
                    <select id="mode" name="mode" class="form-input form-input--compact form-select">
                        <option value="construction" @selected(old('mode', $setting['mode'] ?? 'construction') === 'construction')>
                            Under construction
                        </option>
                        <option value="staging" @selected(old('mode', $setting['mode'] ?? 'construction') === 'staging')>
                            Staging preview
                        </option>
                    </select>
                    @error('mode')<p class="form-error">{{ $message }}</p>@enderror
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="headline">Headline</label>
                    <input
                        type="text"
                        id="headline"
                        name="headline"
                        class="form-input form-input--compact"
                        required
                        value="{{ old('headline', $setting['headline'] ?? 'Website Under Maintenance') }}"
                    >
                    @error('headline')<p class="form-error">{{ $message }}</p>@enderror
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        class="form-textarea form-input--compact"
                        rows="5"
                    >{{ old('message', $setting['message'] ?? '') }}</textarea>
                    @error('message')<p class="form-error">{{ $message }}</p>@enderror
                </section>

                <section class="info-corner-form__section">
                    <label class="form-label" for="contact_email">Contact email (optional)</label>
                    <input
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        class="form-input form-input--compact"
                        value="{{ old('contact_email', $setting['contact_email'] ?? '') }}"
                        placeholder="principal@bihedvg.org"
                    >
                    @error('contact_email')<p class="form-error">{{ $message }}</p>@enderror
                </section>
            </div>
        </div>

        <div class="form-actions form-actions--compact prospectus-form__actions">
            <button type="submit" class="btn btn-primary">Save Settings</button>
            <a href="{{ rtrim(config('website.nextjs_url'), '/') . '/maintenance' }}" class="btn btn-outline" target="_blank" rel="noopener">Preview page</a>
        </div>
    </form>
</div>
@endsection
