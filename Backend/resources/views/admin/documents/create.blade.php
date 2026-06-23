@extends('layouts.app')

@section('title', 'Upload Document')
@section('page-title', 'Upload Document')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.documents.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.documents._form', ['requireFile' => true])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Upload</button>
            <a href="{{ route('admin.documents.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
