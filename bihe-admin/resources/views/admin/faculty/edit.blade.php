@extends('layouts.app')

@section('title', 'Edit Faculty')
@section('page-title', 'Edit Faculty')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.faculty.update', $faculty) }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @method('PUT')
        @include('admin.faculty._form', ['faculty' => $faculty, 'departments' => $departments])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.faculty.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
