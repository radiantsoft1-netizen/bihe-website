@props(['form' => 'admin-bulk-delete-form'])

<button
    type="submit"
    form="{{ $form }}"
    class="btn btn-danger btn-sm"
    data-admin-bulk-delete-btn
    disabled
>
    Delete selected
</button>
