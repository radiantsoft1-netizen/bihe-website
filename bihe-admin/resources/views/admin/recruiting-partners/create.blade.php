@extends('layouts.app')

@section('title', 'New Recruiting Partner')
@section('page-title', 'New Recruiting Partner')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.recruiting-partners.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.recruiting-partners._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.recruiting-partners.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
