@extends('layouts.app')

@section('title', 'Announcements')
@section('page-title', 'Announcements')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Announcements</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.announcements.create') }}" class="btn btn-primary btn-sm">Add Announcement</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.announcements.bulk-destroy') }}"
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
                        <th>Message</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($announcements as $announcement)
                        <tr>
                            <x-admin-bulk-checkbox :id="$announcement->id" />
                            <td class="admin-table__sl-col">{{ ($announcements->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ \Illuminate\Support\Str::limit($announcement->message, 80) }}</td>
                            <td>{{ $announcement->link ? 'Yes' : '—' }}</td>
                            <td>
                                <span class="badge {{ $announcement->active ? 'badge-success' : 'badge-muted' }}">
                                    {{ $announcement->active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.announcements.edit', $announcement)"
                                    :destroy-route="route('admin.announcements.destroy', $announcement)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6">No announcements yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$announcements" />
</div>
@endsection
