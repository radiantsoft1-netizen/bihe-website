@php
    $fieldId = $id ?? 'form-multi-select';
    $fieldName = $name ?? 'items[]';
    $options = collect($options ?? []);
    $selected = collect($selected ?? [])->map(fn ($value) => (int) $value)->all();
    $placeholder = $placeholder ?? 'Select options...';
    $required = !empty($required);
    $addNewUrl = $addNewUrl ?? null;
    $addNewLabel = $addNewLabel ?? 'Add new';
@endphp

<div
    class="form-multi-select{{ $required ? ' form-multi-select--required' : '' }}"
    data-form-multi-select
    data-placeholder="{{ $placeholder }}"
    @if($required) data-required="true" @endif
>
    <button
        type="button"
        class="form-multi-select__trigger"
        id="{{ $fieldId }}-trigger"
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-labelledby="{{ $fieldId }}-label"
        @if($required) aria-required="true" @endif
    >
        <span class="form-multi-select__value" data-form-multi-select-value>{{ $placeholder }}</span>
        <span class="form-multi-select__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </button>

    <div class="form-multi-select__panel" data-form-multi-select-panel hidden>
        <ul class="form-multi-select__list" role="listbox" aria-multiselectable="true">
            @foreach ($options as $option)
                @php
                    $value = (int) ($option['value'] ?? 0);
                    $label = (string) ($option['label'] ?? '');
                @endphp
                <li role="presentation">
                    <label class="form-multi-select__option">
                        <input
                            type="checkbox"
                            name="{{ $fieldName }}"
                            value="{{ $value }}"
                            data-form-multi-select-input
                            data-label="{{ $label }}"
                            {{ in_array($value, $selected, true) ? 'checked' : '' }}
                        >
                        <span>{{ $label }}</span>
                    </label>
                </li>
            @endforeach
        </ul>

        @if (!empty($addNewUrl))
            <div class="form-multi-select__footer">
                <a href="{{ $addNewUrl }}" class="form-multi-select__add-new">
                    <span aria-hidden="true">+</span>
                    {{ $addNewLabel }}
                </a>
            </div>
        @endif
    </div>

    <p class="form-multi-select__error" data-form-multi-select-error hidden>Please select at least one category.</p>
</div>
