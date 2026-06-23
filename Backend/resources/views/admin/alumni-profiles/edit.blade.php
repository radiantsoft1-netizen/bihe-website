@extends('layouts.app')

@section('title', 'Edit Alumni Profile')
@section('page-title', 'Edit Alumni Profile')

@section('content')
@if ($profile->source === 'registration' || $profile->approval_status !== 'approved')
<div class="admin-card" style="margin-bottom:1rem;">
    <h3 style="margin-top:0;">Registration details</h3>
    <p class="form-hint">
        Source: {{ $profile->source === 'registration' ? 'Self-registered' : 'Admin' }}
        · Status: {{ ucfirst($profile->approval_status ?? 'approved') }}
        @if ($profile->submitted_at)
            · Submitted {{ $profile->submitted_at->format('d M Y, H:i') }}
        @endif
        @if ($profile->approved_at)
            · Approved {{ $profile->approved_at->format('d M Y, H:i') }}
        @endif
    </p>
    @if ($profile->rejection_note)
        <p class="form-error">Rejection note: {{ $profile->rejection_note }}</p>
    @endif
    @if ($profile->approval_status === 'pending')
        <div class="form-actions" style="margin-top:1rem;">
            <form method="POST" class="admin-form info-corner-form" action="{{ route('admin.alumni-profiles.approve', $profile) }}" style="display:inline;">
                @csrf
                <button type="submit" class="btn btn-primary btn-sm">Approve</button>
            </form>
            <form method="POST" action="{{ route('admin.alumni-profiles.reject', $profile) }}" style="display:inline;">
                @csrf
                <button type="submit" class="btn btn-outline btn-sm">Reject</button>
            </form>
        </div>
    @endif
</div>
@endif
<div class="admin-card admin-card--form">
    <form method="POST" action="{{ route('admin.alumni-profiles.update', $profile) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.alumni-profiles._form', ['profile' => $profile])
        <div class="form-actions form-actions--compact">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="{{ route('admin.alumni-profiles.index') }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
