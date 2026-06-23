<div class="admin-delete-confirm" data-delete-confirm-modal hidden>
    <div class="admin-delete-confirm__backdrop" data-delete-confirm-cancel tabindex="-1" aria-hidden="true"></div>
    <div
        class="admin-delete-confirm__dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-delete-confirm-title"
        aria-describedby="admin-delete-confirm-message"
    >
        <div class="admin-delete-confirm__layout">
            <div class="admin-delete-confirm__illustration" aria-hidden="true">
                <svg class="admin-delete-confirm__art" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="48" cy="48" r="44" fill="#FEF2F2" stroke="#FECACA" stroke-width="2"/>
                    <path d="M34 38h28l-2 34a4 4 0 0 1-4 3.6H40a4 4 0 0 1-4-3.6L34 38Z" fill="#FEE2E2" stroke="#B91C1C" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M30 38h36" stroke="#740000" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M40 38V32a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" stroke="#740000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M42 46v22M48 46v22M54 46v22" stroke="#B91C1C" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="68" cy="30" r="12" fill="#740000"/>
                    <path d="M64 30h8M68 26v8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>

            <div class="admin-delete-confirm__body">
                <h2 class="admin-delete-confirm__title" id="admin-delete-confirm-title">Confirm delete</h2>
                <p class="admin-delete-confirm__message" id="admin-delete-confirm-message" data-delete-confirm-message>
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div class="admin-delete-confirm__actions">
                    <button type="button" class="btn btn-outline btn-sm" data-delete-confirm-cancel>No, keep it</button>
                    <button type="button" class="btn btn-danger btn-sm" data-delete-confirm-accept>Yes, delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
