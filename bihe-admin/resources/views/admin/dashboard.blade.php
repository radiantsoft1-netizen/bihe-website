@extends('layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<div class="dashboard">
    @include('admin.dashboard.partials.welcome')
    @include('admin.dashboard.partials.stats')

    <div class="dashboard-panels dashboard-panels--split">
        <div class="dashboard-stack">
            @include('admin.dashboard.partials.notifications')
            @include('admin.dashboard.partials.quick-links')
        </div>
        <div class="dashboard-stack">
            @if ($showSecurityPanel)
                @include('admin.dashboard.partials.security-overview')
            @endif
            @include('admin.dashboard.partials.recent-activity')
        </div>
    </div>
</div>
@endsection
