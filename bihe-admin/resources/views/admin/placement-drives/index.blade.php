@extends('layouts.app')

@section('title', 'Placement Drives')
@section('page-title', 'Placement Drives')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Placement Drives</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.placement-drives.create') }}" class="btn btn-primary btn-sm">Add Drive</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.placement-drives.bulk-destroy') }}"
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
                        <th>Event Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($placementDrives as $drive)
                        <tr>
                            <x-admin-bulk-checkbox :id="$drive->id" />
                            <td class="admin-table__sl-col">{{ ($placementDrives->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $drive->title }}</td>
                            <td>{{ $drive->event_date?->format('d M Y') ?? '—' }}</td>
                            <td>
                                <span class="badge {{ $drive->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $drive->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.placement-drives.edit', $drive)"
                                    :destroy-route="route('admin.placement-drives.destroy', $drive)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6">No placement drives yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$placementDrives" />
</div>
@endsection
