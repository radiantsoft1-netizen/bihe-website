@extends('layouts.app')

@section('title', 'Edit Hero Banner')
@section('page-title', 'Edit Hero Banner')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.hero-banners.update', $heroBanner) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.hero-banners._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.hero-banners.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
