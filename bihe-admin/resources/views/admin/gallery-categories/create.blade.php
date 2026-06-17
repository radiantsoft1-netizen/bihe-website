@extends('layouts.app')

@section('title', 'New Gallery Category')
@section('page-title', 'New Gallery Category')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.gallery-categories.store') }}">
        @csrf
        @include('admin.gallery-categories._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.gallery-categories.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
