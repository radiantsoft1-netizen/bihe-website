@php
    $album = $galleryAlbum ?? null;
    $existingGalleryImages = !empty($album)
        ? $album->media->filter(fn ($item) => $item->type->value === 'image')
        : collect();
    $imageMedia = !empty($album)
        ? $album->media->filter(fn ($item) => $item->type->value === 'image')
        : collect();
@endphp

<div class="info-corner-form__layout">
    <div class="info-corner-form__column info-corner-form__column--main">
        <section class="info-corner-form__section info-corner-form__section--meta-row info-corner-form__section--panel">
            <div class="info-corner-form__meta-row">
                <div class="info-corner-form__meta-row-categories">
                    <span class="form-label">Gallery Album</span>
                    <p class="form-hint form-hint--tight">Title, description, and photos shown on the public gallery pages.</p>
                </div>

                <div class="info-corner-form__meta-row-scroller">
                    <label class="form-checkbox form-checkbox--compact" for="published">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            value="1"
                            @checked(old('published', $album?->published ?? true))
                        >
                        <span>Published</span>
                    </label>
                    @error('published')<p class="form-error">{{ $message }}</p>@enderror

                    <label class="form-checkbox form-checkbox--compact" for="is_featured">
                        <input
                            type="checkbox"
                            id="is_featured"
                            name="is_featured"
                            value="1"
                            @checked(old('is_featured', $album?->is_featured ?? false))
                        >
                        <span>Featured on homepage</span>
                    </label>
                    @error('is_featured')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            </div>
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="title">Album Title</label>
            <input
                type="text"
                id="title"
                name="title"
                class="form-input form-input--compact"
                required
                value="{{ old('title', $album?->title ?? '') }}"
            >
            @error('title')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section">
            <label class="form-label" for="slug">Slug (optional)</label>
            <input
                type="text"
                id="slug"
                name="slug"
                class="form-input form-input--compact"
                value="{{ old('slug', $album?->slug ?? '') }}"
            >
            <p class="form-hint form-hint--tight">Auto-generated from title if left blank.</p>
            @error('slug')<p class="form-error">{{ $message }}</p>@enderror
        </section>

        <section class="info-corner-form__section info-corner-form__section--editor">
            <label class="form-label" for="description">Description</label>
            <textarea
                id="description"
                name="description"
                class="form-textarea info-corner-form__editor js-rich-text"
                data-rich-text
                data-rich-text-height="220"
                rows="6"
            >{{ old('description', $album?->description ?? '') }}</textarea>
            @error('description')<p class="form-error">{{ $message }}</p>@enderror
        </section>
    </div>

    <aside class="info-corner-form__column info-corner-form__column--side">
        <section class="info-corner-form__section info-corner-form__section--panel info-corner-form__section--publish">
            <div class="info-corner-form__panel-field">
                <label class="form-label" for="gallery_category_id">Category</label>
                <select id="gallery_category_id" name="gallery_category_id" class="form-input form-input--compact">
                    <option value="">— Select category —</option>
                    @foreach (($categories ?? collect()) as $category)
                        <option value="{{ $category->id }}"
                            @selected((string) old('gallery_category_id', $album?->gallery_category_id) === (string) $category->id)>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>
                @error('gallery_category_id')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="sort_order">Display Order</label>
                <input
                    type="number"
                    id="sort_order"
                    name="sort_order"
                    class="form-input form-input--compact"
                    min="0"
                    value="{{ old('sort_order', $album?->sort_order ?? 0) }}"
                >
                @error('sort_order')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            @if ($imageMedia->isNotEmpty())
                <div class="info-corner-form__panel-field">
                    <label class="form-label" for="featured_media_id">Featured Cover Image</label>
                    <select id="featured_media_id" name="featured_media_id" class="form-input form-input--compact">
                        <option value="">Auto-select first image</option>
                        @foreach ($imageMedia as $media)
                            <option value="{{ $media->id }}"
                                @selected((string) old('featured_media_id', $album?->featured_media_id) === (string) $media->id)>
                                {{ $media->title ?? 'Image #'.$media->id }}
                            </option>
                        @endforeach
                    </select>
                    @error('featured_media_id')<p class="form-error">{{ $message }}</p>@enderror
                </div>
            @endif
        </section>
    </aside>

    <div class="info-corner-form__detail-block">
        <section class="info-corner-form__section info-corner-form__section--media info-corner-form__section--images">
            <label class="form-label" for="images">Album Photos @if(!empty($album)) (add or remove) @endif</label>
            @include('components.media-picker-multi', [
                'id' => 'images',
                'name' => 'images',
                'libraryName' => 'image_library_paths',
                'existingImages' => $existingGalleryImages,
            ])
        </section>

        <section class="info-corner-form__section info-corner-form__section--panel">
            <p class="info-corner-form__section-title">Add YouTube Video</p>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="youtube_title">Video Title</label>
                <input
                    type="text"
                    id="youtube_title"
                    name="youtube_title"
                    class="form-input form-input--compact"
                    value="{{ old('youtube_title') }}"
                    placeholder="Optional label"
                >
                @error('youtube_title')<p class="form-error">{{ $message }}</p>@enderror
            </div>

            <div class="info-corner-form__panel-field">
                <label class="form-label" for="youtube_url">YouTube URL</label>
                <input
                    type="url"
                    id="youtube_url"
                    name="youtube_url"
                    class="form-input form-input--compact"
                    value="{{ old('youtube_url') }}"
                    placeholder="https://www.youtube.com/watch?v=..."
                >
                @error('youtube_url')<p class="form-error">{{ $message }}</p>@enderror
            </div>
        </section>

        @if (!empty($album) && $album->media->isNotEmpty())
            <section class="info-corner-form__section">
                <p class="info-corner-form__section-title">Album Media</p>
                <p class="form-hint form-hint--tight">Reorder items or remove existing photos and videos. New uploads are managed in the picker above.</p>

                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($album->media as $media)
                                <tr>
                                    <td>
                                        @if ($media->type->value === 'image' && $media->image_path)
                                            <x-storage-image :path="$media->image_path" alt="" />
                                        @elseif ($media->youtube_id)
                                            <span class="badge badge-muted">YouTube</span>
                                        @else
                                            —
                                        @endif
                                    </td>
                                    <td>{{ $media->title ?? '—' }}</td>
                                    <td>{{ ucfirst($media->type->value) }}</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="media_order[{{ $media->id }}]"
                                            class="form-input form-input--compact admin-table__order-input"
                                            min="0"
                                            value="{{ old('media_order.'.$media->id, $media->sort_order) }}"
                                            aria-label="Order for {{ $media->title ?? 'media item' }}"
                                        >
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-outline btn-sm"
                                            data-confirm-delete-btn
                                            data-delete-url="{{ route('admin.gallery.media.destroy', [$album, $media]) }}"
                                            data-delete-label="{{ $media->title ?? 'this media item' }}"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </section>
        @endif
    </div>
</div>
