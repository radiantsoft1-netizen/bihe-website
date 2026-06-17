@extends('layouts.app')

@section('title', 'New Info Corner Category')
@section('page-title', 'New Info Corner Category')

@section('content')
<div class="admin-card admin-card--form">
    <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.info-corner-categories.store') }}">
        @csrf
        @if (!empty($returnUrl))
            <input type="hidden" name="return_url" value="{{ $returnUrl }}">
        @endif
        @include('admin.info-corner-categories._form')
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save Category</button>
            <a href="{{ $returnUrl ?? route('admin.info-corner-categories.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
