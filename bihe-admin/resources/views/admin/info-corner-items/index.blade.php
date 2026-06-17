@extends('layouts.app')

@section('title', 'Info Corner Items')
@section('page-title', 'Info Corner Items')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Info Corner Items</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.info-corner-categories.index') }}" class="btn btn-outline btn-sm">Categories</a>
            <a href="{{ route('admin.info-corner-items.create') }}" class="btn btn-primary btn-sm">Add Item</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.info-corner-items.bulk-destroy') }}"
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
                        <th>Title</th>
                        <th>Badge</th>
                        <th>Categories</th>
                        <th>Date</th>
                        <th>Home Scroller</th>
                        <th>Frontend</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($infoCornerItems as $item)
                        <tr>
                            <x-admin-bulk-checkbox :id="$item->id" />
                            <td class="admin-table__sl-col">{{ ($infoCornerItems->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $item->title }}</td>
                            <td>{{ $item->badge_text ?: '—' }}</td>
                            <td>{{ $item->categories->pluck('name')->join(', ') ?: ($item->category?->name ?? '—') }}</td>
                            <td>{{ $item->published_date?->format('d M Y') ?? '—' }}</td>
                            <td>
                                @if ($item->show_in_home_scroller)
                                    <span class="badge badge-success">Yes</span>
                                @else
                                    <span class="badge badge-muted">No</span>
                                @endif
                            </td>
                            <td>
                                <span class="badge {{ $item->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $item->published ? 'Visible' : 'Hidden' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.info-corner-items.edit', $item)"
                                    :destroy-route="route('admin.info-corner-items.destroy', $item)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="9">No info corner items yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$infoCornerItems" />
</div>
@endsection
