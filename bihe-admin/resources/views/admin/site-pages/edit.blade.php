@extends('layouts.app')

@section('title', 'Edit Site Page')
@section('page-title', 'Edit Site Page')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.site-pages.update', $sitePage) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.site-pages._form', ['sitePage' => $sitePage])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <a href="{{ route('admin.site-pages.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
