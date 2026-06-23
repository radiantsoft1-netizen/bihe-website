@extends('layouts.app')

@section('title', 'New Announcement')
@section('page-title', 'New Announcement')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.announcements.store') }}">
        @csrf
        @include('admin.announcements._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.announcements.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
