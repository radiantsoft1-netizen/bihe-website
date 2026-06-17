@extends('layouts.app')

@section('title', 'New News Item')
@section('page-title', 'New News Item')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.news-events.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.news-events._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.news-events.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
