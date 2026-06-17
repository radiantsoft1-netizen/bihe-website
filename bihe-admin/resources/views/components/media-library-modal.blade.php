<div id="admin-media-library" class="admin-media-library" hidden aria-hidden="true">
    <div class="admin-media-library__backdrop" data-media-library-close></div>
    <div class="admin-media-library__dialog" role="dialog" aria-modal="true" aria-labelledby="admin-media-library-title">
        <header class="admin-media-library__header">
            <div>
                <h2 id="admin-media-library-title" class="admin-media-library__title">Media Library</h2>
                <p class="admin-media-library__subtitle">Choose an already uploaded file, or upload a new one from your computer.</p>
            </div>
            <button type="button" class="admin-media-library__close" data-media-library-close aria-label="Close media library">&times;</button>
        </header>

        <div class="admin-media-library__body">
            <nav class="admin-media-library__categories" aria-label="Media categories">
                <p class="admin-media-library__categories-label">Categories</p>
                <ul class="admin-media-library__category-list" data-media-library-categories></ul>
            </nav>

            <div class="admin-media-library__main">
                <div class="media-picker__card">
                    <p class="media-picker__heading">Browse uploaded files:</p>
                    <div class="admin-media-library__toolbar">
                        <p class="admin-media-library__current-category" data-media-library-current-category>Select a category</p>
                        <div class="admin-media-library__toolbar-actions">
                            <button type="button" class="btn btn-danger btn-sm admin-media-library__delete-btn" data-media-library-delete disabled>
                                <svg class="admin-media-library__delete-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M6 7l1 14h10l1-14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                    <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                </svg>
                                <span data-media-library-delete-label>Delete selected</span>
                            </button>
                            <button type="button" class="media-picker__computer-btn" data-media-library-upload>Choose from Computer</button>
                        </div>
                    </div>
                    <div class="admin-media-library__search">
                        <label class="admin-media-library__search-label" for="admin-media-library-search">Search files</label>
                        <div class="admin-media-library__search-field">
                            <span class="admin-media-library__search-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                                    <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </span>
                            <input
                                type="search"
                                id="admin-media-library-search"
                                class="admin-media-library__search-input"
                                placeholder="Search by file name..."
                                data-media-library-search
                                autocomplete="off"
                            >
                        </div>
                    </div>
                    <div class="admin-media-library__grid admin-media-library__grid--picker" data-media-library-grid></div>
                    <p class="admin-media-library__empty" data-media-library-empty hidden>No files in this category yet.</p>
                </div>
            </div>
        </div>

        <footer class="admin-media-library__footer">
            <p class="admin-media-library__selection" data-media-library-selection>No file selected</p>
            <div class="admin-media-library__footer-actions">
                <button type="button" class="btn btn--ghost" data-media-library-close>Cancel</button>
                <button type="button" class="btn btn--primary" data-media-library-select disabled>Use selected file</button>
            </div>
        </footer>
    </div>
</div>
