@props([
    'action',
    'method' => 'POST',
    'enctype' => null,
    'submitLabel' => 'Save',
    'cancelUrl',
    'cardClass' => '',
])

<div @class(['admin-card', 'admin-card--form', 'admin-card--info-corner-form' => str_contains($cardClass, 'info-corner'), $cardClass])>
    <form
        method="{{ $method }}"
        action="{{ $action }}"
        @if ($enctype) enctype="{{ $enctype }}" @endif
        class="admin-form info-corner-form"
    >
        @csrf
        {{ $slot }}
        <div class="form-actions form-actions--compact">
            @isset($actions)
                {{ $actions }}
            @endisset
            <button type="submit" class="btn btn-primary">{{ $submitLabel }}</button>
            <a href="{{ $cancelUrl }}" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
