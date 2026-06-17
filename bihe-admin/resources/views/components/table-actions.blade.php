@props(['editRoute', 'destroyRoute'])

<div class="table-actions">
    <a href="{{ $editRoute }}" class="btn btn-outline btn-sm">Edit</a>
    <button
        type="button"
        class="btn btn-danger btn-sm"
        data-confirm-delete-btn
        data-delete-url="{{ $destroyRoute }}"
    >
        Delete
    </button>
</div>
