@props(['path', 'alt' => '', 'class' => 'thumb-preview'])

@php
    $src = $path ? \App\Support\StoredFileUrl::publicImage($path) : null;
@endphp

@if ($src)
    <img src="{{ $src }}" alt="{{ $alt }}" {{ $attributes->merge(['class' => $class]) }} loading="lazy">
@endif
