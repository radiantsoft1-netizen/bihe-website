@extends('layouts.app')

@section('title', 'Gallery Albums')
@section('page-title', 'Gallery Albums')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Photo Albums</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.gallery-categories.index') }}" class="btn btn-outline btn-sm">Categories</a>
            <a href="{{ route('admin.gallery.create') }}" class="btn btn-primary btn-sm">Add Album</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.gallery.bulk-destroy') }}"
        data-admin-bulk-delete-form
    >
        @csrf
        @method('DELETE')
        <div class="admin-table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <x-admin-bulk-checkbox-all />
                        <th class="admin-table__sl-col">SL</th>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Flags</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($albums as $album)
                        <tr>
                            <x-admin-bulk-checkbox :id="$album->id" />
                            <td class="admin-table__sl-col">{{ ($albums->firstItem() ?? 0) + $loop->index }}</td>
                            <td>
                                @if ($album->featuredMedia?->image_path)
                                    <img src="{{ asset('storage/'.$album->featuredMedia->image_path) }}" alt="" class="thumb-preview">
                                @else
                                    —
                                @endif
                            </td>
                            <td>{{ $album->title }}</td>
                            <td>{{ $album->category?->name ?? '—' }}</td>
                            <td>{{ $album->media_count }}</td>
                            <td>
                                <span class="badge {{ $album->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $album->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                @if ($album->is_featured)
                                    <span class="badge badge-success">Featured</span>
                                @endif
                            </td>
                            <td>{{ $album->sort_order }}</td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.gallery.edit', $album)"
                                    :destroy-route="route('admin.gallery.destroy', $album)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="10">No albums yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$albums" />
</div>
@endsection
