<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard') — BIHE Admin</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ \App\Support\AdminAsset::url('assets/css/admin.css') }}">
    @include('components.rich-text-assets')
    @stack('head')
</head>
<body>
<div class="admin-shell">
    @include('layouts.sidebar')

    <div class="admin-main">
        @include('layouts.header')

        <main class="admin-content">
            @include('components.alert')
            @yield('content')
        </main>

        @include('layouts.footer')
    </div>
</div>
@include('components.media-library-modal')
@stack('scripts')
<script src="{{ \App\Support\AdminAsset::url('assets/js/admin.js') }}" defer></script>
<script src="{{ \App\Support\AdminAsset::url('assets/js/admin-media-library.js') }}" defer></script>
</body>
</html>
