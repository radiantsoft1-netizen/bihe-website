@extends('layouts.app')

@section('title', 'New Site Page')
@section('page-title', 'New Site Page')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.site-pages.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.site-pages._form', ['sitePage' => null])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.site-pages.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
