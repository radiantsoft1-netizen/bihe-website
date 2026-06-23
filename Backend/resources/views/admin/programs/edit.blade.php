@extends('layouts.app')

@section('title', 'Edit Program')
@section('page-title', 'Edit Program')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.programs.update', $program) }}">
        @csrf
        @method('PUT')
        @include('admin.programs._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.programs.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
