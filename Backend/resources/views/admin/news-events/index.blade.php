@extends('layouts.app')

@section('title', 'News & Events')
@section('page-title', 'News & Events')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All News & Events</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.news-categories.index') }}" class="btn btn-outline btn-sm">Categories</a>
            <a href="{{ route('admin.news-events.create') }}" class="btn btn-primary btn-sm">Add News Item</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.news-events.bulk-destroy') }}"
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
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Flags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($newsEvents as $item)
                        <tr>
                            <x-admin-bulk-checkbox :id="$item->id" />
                            <td class="admin-table__sl-col">{{ ($newsEvents->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $item->title }}</td>
                            <td>{{ $item->category?->name ?? '—' }}</td>
                            <td>{{ $item->event_date?->format('d M Y') ?? '—' }}</td>
                            <td>
                                <span class="badge {{ $item->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $item->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                @if ($item->is_featured)
                                    <span class="badge badge-success">Featured</span>
                                @endif
                                @if ($item->show_in_ticker)
                                    <span class="badge badge-muted">Ticker</span>
                                @endif
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.news-events.edit', $item)"
                                    :destroy-route="route('admin.news-events.destroy', $item)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No news items yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$newsEvents" />
</div>
@endsection
