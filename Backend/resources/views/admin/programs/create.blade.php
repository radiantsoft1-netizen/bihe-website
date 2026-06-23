@extends('layouts.app')

@section('title', 'New Program')
@section('page-title', 'New Program')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.programs.store') }}">
        @csrf
        @include('admin.programs._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.programs.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
