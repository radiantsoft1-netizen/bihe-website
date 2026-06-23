@extends('layouts.app')

@section('title', 'New Alumni Profile')
@section('page-title', 'New Alumni Profile')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.alumni-profiles.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.alumni-profiles._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.alumni-profiles.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
