@extends('layouts.app')

@section('title', 'Edit Placement Drive')
@section('page-title', 'Edit Placement Drive')

@section('content')
<div class="admin-card admin-card--form admin-card--info-corner-form">
    <form method="POST" action="{{ route('admin.placement-drives.update', $placementDrive) }}" enctype="multipart/form-data" class="admin-form info-corner-form">
        @csrf
        @method('PUT')
        @include('admin.placement-drives._form', ['placementDrive' => $placementDrive])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <a href="{{ route('admin.placement-drives.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
