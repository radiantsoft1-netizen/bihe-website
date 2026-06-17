@extends('layouts.app')

@section('title', 'Edit Gallery Category')
@section('page-title', 'Edit Gallery Category')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.gallery-categories.update', $galleryCategory) }}">
        @csrf
        @method('PUT')
        @include('admin.gallery-categories._form', ['galleryCategory' => $galleryCategory])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.gallery-categories.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
