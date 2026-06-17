@extends('layouts.app')

@section('title', 'Governing Bodies')
@section('page-title', 'Governing Bodies')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Governing Body Members</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.governing-bodies.create') }}" class="btn btn-primary btn-sm">Add Member</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.governing-bodies.bulk-destroy') }}"
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
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Badge</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($governingBodies as $governingBody)
                        <tr>
                            <x-admin-bulk-checkbox :id="$governingBody->id" />
                            <td class="admin-table__sl-col">{{ ($governingBodies->firstItem() ?? 0) + $loop->index }}</td>
                            <td>
                                @if ($governingBody->photo_path)
                                    <img src="{{ \App\Support\StoredFileUrl::publicImage($governingBody->photo_path) }}" alt="" class="thumb-preview">
                                @else
                                    —
                                @endif
                            </td>
                            <td>{{ $governingBody->name }}</td>
                            <td>{{ $governingBody->badge }}</td>
                            <td>{{ $governingBody->sort_order }}</td>
                            <td>
                                <span class="badge {{ $governingBody->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $governingBody->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.governing-bodies.edit', $governingBody)"
                                    :destroy-route="route('admin.governing-bodies.destroy', $governingBody)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No governing body members yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$governingBodies" />
</div>
@endsection
