@extends('layouts.app')

@section('title', 'Add Placement Drive')
@section('page-title', 'Add Placement Drive')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.placement-drives.store') }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @include('admin.placement-drives._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Create Drive</button>
            <a href="{{ route('admin.placement-drives.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
