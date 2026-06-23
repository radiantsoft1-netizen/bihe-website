@extends('layouts.app')

@section('title', 'New Menu Item')
@section('page-title', 'New Menu Item')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.menu-items.store') }}">
        @csrf
        @include('admin.menu-items._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.menu-items.index', ['menu' => $menuKey]) }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
