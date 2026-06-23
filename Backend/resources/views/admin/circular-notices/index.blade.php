@extends('layouts.app')

@section('title', 'Circular Notices')
@section('page-title', 'Circular Notices')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Circular Notices</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.circular-notices.create') }}" class="btn btn-primary btn-sm">Add Notice</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.circular-notices.bulk-destroy') }}"
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
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($circularNotices as $notice)
                        <tr>
                            <x-admin-bulk-checkbox :id="$notice->id" />
                            <td class="admin-table__sl-col">{{ ($circularNotices->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $notice->title }}</td>
                            <td>{{ $notice->published_date?->format('d M Y') ?? '—' }}</td>
                            <td>
                                <span class="badge {{ $notice->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $notice->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.circular-notices.edit', $notice)"
                                    :destroy-route="route('admin.circular-notices.destroy', $notice)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6">No circular notices yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$circularNotices" />
</div>
@endsection
