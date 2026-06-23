@extends('layouts.app')

@section('title', 'Edit Info Corner Item')
@section('page-title', 'Edit Info Corner Item')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.info-corner-items.update', $infoCornerItem) }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @method('PUT')
        @include('admin.info-corner-items._form', ['infoCornerItem' => $infoCornerItem])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <a href="{{ route('admin.info-corner-items.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
