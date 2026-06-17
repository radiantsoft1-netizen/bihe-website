@extends('layouts.app')

@section('title', 'Add Info Corner Item')
@section('page-title', 'Add Info Corner Item')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.info-corner-items.store') }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @include('admin.info-corner-items._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Create Item</button>
            <a href="{{ route('admin.info-corner-items.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
