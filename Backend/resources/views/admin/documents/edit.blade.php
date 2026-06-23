@extends('layouts.app')

@section('title', 'Edit Document')
@section('page-title', 'Edit Document')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.documents.update', $document) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.documents._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.documents.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
