@props(['id'])

<td class="admin-table__check-col">
    <label class="admin-table__check">
        <input
            type="checkbox"
            name="ids[]"
            value="{{ $id }}"
            data-admin-bulk-row
            aria-label="Select row"
        >
    </label>
</td>
