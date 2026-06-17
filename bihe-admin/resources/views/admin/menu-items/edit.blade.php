@extends('layouts.app')

@section('title', 'Edit Menu Item')
@section('page-title', 'Edit Menu Item')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.menu-items.update', $menuItem) }}">
        @csrf
        @method('PUT')
        @include('admin.menu-items._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.menu-items.index', ['menu' => $menuKey]) }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
