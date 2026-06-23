@extends('layouts.app')

@section('title', 'Edit Album')
@section('page-title', 'Edit Gallery Album')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.gallery.update', $galleryAlbum) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.gallery._form', ['galleryAlbum' => $galleryAlbum, 'categories' => $categories])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Update Album</button>
            <a href="{{ route('admin.gallery.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
