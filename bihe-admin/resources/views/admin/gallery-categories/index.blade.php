@extends('layouts.app')

@section('title', 'Gallery Categories')
@section('page-title', 'Gallery Categories')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Gallery Categories</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.gallery.index') }}" class="btn btn-outline btn-sm">Back to Albums</a>
            <a href="{{ route('admin.gallery-categories.create') }}" class="btn btn-primary btn-sm">Add Category</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.gallery-categories.bulk-destroy') }}"
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
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Albums</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($categories as $category)
                        <tr>
                            <x-admin-bulk-checkbox :id="$category->id" />
                            <td class="admin-table__sl-col">{{ ($categories->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $category->name }}</td>
                            <td>{{ $category->slug }}</td>
                            <td>{{ $category->albums_count }}</td>
                            <td>
                                <span class="badge {{ $category->is_active ? 'badge-success' : 'badge-muted' }}">
                                    {{ $category->is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td>{{ $category->sort_order }}</td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.gallery-categories.edit', $category)"
                                    :destroy-route="route('admin.gallery-categories.destroy', $category)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No categories yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$categories" />
</div>
@endsection
