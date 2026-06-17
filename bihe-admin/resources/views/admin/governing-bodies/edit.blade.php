@extends('layouts.app')

@section('title', 'Edit Governing Body Member')
@section('page-title', 'Edit Governing Body Member')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.governing-bodies.update', $governingBody) }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @method('PUT')
        @include('admin.governing-bodies._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.governing-bodies.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
