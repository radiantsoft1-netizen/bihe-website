@extends('layouts.app')

@section('title', 'Edit Circular Notice')
@section('page-title', 'Edit Circular Notice')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.circular-notices.update', $circularNotice) }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @method('PUT')
        @include('admin.circular-notices._form', ['circularNotice' => $circularNotice])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <a href="{{ route('admin.circular-notices.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
