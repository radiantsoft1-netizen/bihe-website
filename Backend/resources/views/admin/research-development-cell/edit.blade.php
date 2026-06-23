@extends('layouts.app')

@section('title', 'Research & Development Cell')
@section('page-title', 'Research & Development Cell')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.research-development-cell.update') }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @method('PUT')

        <section class="info-corner-form__section info-corner-form__section--panel rdc-page-intro">
            <p class="form-hint form-hint--tight rdc-page-intro__text">
                Manage research projects for <strong><code>/research/research-and-development-cell</code></strong>.
                The page hero (title and summary) stays fixed on the website. Update project titles, categories, images, and Aim/Conclusion below.
            </p>
        </section>

        @include('admin.site-pages._rdc-projects', ['page' => $sitePage])

        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.dashboard') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
