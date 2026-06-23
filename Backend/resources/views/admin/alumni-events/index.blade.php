@extends('layouts.app')

@section('title', 'Alumni Events')
@section('page-title', 'Alumni Events')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Alumni Events</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <button
                type="button"
                id="alumni-events-sort-orders-save"
                class="btn btn-outline btn-sm"
                data-sort-orders-url="{{ route('admin.alumni-events.sort-orders') }}"
                disabled
            >
                Update Display Order
            </button>
            <a href="{{ route('admin.alumni-events.create') }}" class="btn btn-primary btn-sm">Add Event</a>
        </div>
    </div>

    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.alumni-events.bulk-destroy') }}"
        data-admin-bulk-delete-form
    >
        @csrf
        @method('DELETE')
        <div class="admin-table-wrap">
            <table class="admin-table" id="alumni-events-sort-orders-table">
                <thead>
                    <tr>
                        <x-admin-bulk-checkbox-all />
                        <th class="admin-table__sl-col">SL</th>
                        <th>Title</th>
                        <th>Event Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($events as $event)
                        <tr>
                            <x-admin-bulk-checkbox :id="$event->id" />
                            <td class="admin-table__sl-col">{{ ($events->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $event->title }}</td>
                            <td>{{ $event->event_date?->format('d M Y') ?? '—' }}</td>
                            <td>{{ $event->venue ?? '—' }}</td>
                            <td>
                                <span class="badge {{ $event->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $event->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-input admin-table__order-input"
                                    min="0"
                                    step="1"
                                    value="{{ $event->sort_order }}"
                                    data-alumni-event-id="{{ $event->id }}"
                                    data-initial-order="{{ $event->sort_order }}"
                                    aria-label="Display order for {{ $event->title }}"
                                >
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.alumni-events.edit', $event)"
                                    :destroy-route="route('admin.alumni-events.destroy', $event)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No alumni events yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$events" />
</div>
@endsection
