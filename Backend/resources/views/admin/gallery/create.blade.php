@extends('layouts.app')

@section('title', 'New Album')
@section('page-title', 'New Gallery Album')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.gallery.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.gallery._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Album</button>
            <a href="{{ route('admin.gallery.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
