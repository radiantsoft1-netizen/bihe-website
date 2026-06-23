@props(['editRoute', 'destroyRoute', 'deleteLabel' => null])

<div class="table-actions">
    <a href="{{ $editRoute }}" class="btn btn-outline btn-sm">Edit</a>
    <button
        type="button"
        class="btn btn-danger btn-sm"
        data-confirm-delete-btn
        data-delete-url="{{ $destroyRoute }}"
        @if($deleteLabel) data-delete-label="{{ $deleteLabel }}" @endif
    >
        Delete
    </button>
</div>
