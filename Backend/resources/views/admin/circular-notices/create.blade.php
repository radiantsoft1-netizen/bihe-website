@extends('layouts.app')

@section('title', 'Add Circular Notice')
@section('page-title', 'Add Circular Notice')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.circular-notices.store') }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @include('admin.circular-notices._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Create Notice</button>
            <a href="{{ route('admin.circular-notices.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
