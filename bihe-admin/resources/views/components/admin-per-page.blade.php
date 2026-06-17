@props([
    'selected' => '15',
    'default' => '15',
])

@php
    $resolvedSelected = (string) ($selected ?: $default);
    $selectId = 'admin-per-page-' . md5((string) request()->path());
@endphp

<form method="GET" action="{{ url()->current() }}" class="admin-per-page">
    @foreach (request()->except(['per_page', 'page']) as $key => $value)
        @if (is_array($value))
            @foreach ($value as $nestedKey => $nestedValue)
                <input type="hidden" name="{{ $key }}[{{ $nestedKey }}]" value="{{ $nestedValue }}">
            @endforeach
        @else
            <input type="hidden" name="{{ $key }}" value="{{ $value }}">
        @endif
    @endforeach
    <label for="{{ $selectId }}" class="admin-per-page__label">Rows</label>
    <select
        id="{{ $selectId }}"
        name="per_page"
        class="form-input admin-per-page__select"
        data-admin-per-page
        aria-label="Rows per page"
    >
        @foreach ([15, 20, 25, 50, 100] as $option)
            <option value="{{ $option }}" @selected($resolvedSelected === (string) $option)>{{ $option }}</option>
        @endforeach
        <option value="all" @selected($resolvedSelected === 'all')>All</option>
    </select>
</form>

@once
    @push('scripts')
        <script>
            (function () {
                document.querySelectorAll('[data-admin-per-page]').forEach(function (select) {
                    if (select.dataset.perPageBound === '1') {
                        return;
                    }

                    select.dataset.perPageBound = '1';
                    select.addEventListener('change', function () {
                        if (select.form) {
                            select.disabled = true;
                            select.form.submit();
                        }
                    });
                });
            })();
        </script>
    @endpush
@endonce
