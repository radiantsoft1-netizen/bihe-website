@extends('layouts.app')

@section('title', 'Users')
@section('page-title', 'User Management')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Users</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.users.create') }}" class="btn btn-primary btn-sm">Add User</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.users.bulk-destroy') }}"
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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($users as $user)
                        <tr>
                            @if ($user->id !== auth()->id())
                                <x-admin-bulk-checkbox :id="$user->id" />
                            @else
                                <td class="admin-table__check-col" aria-hidden="true"></td>
                            @endif
                            <td class="admin-table__sl-col">{{ ($users->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->username }}</td>
                            <td>{{ $user->email }}</td>
                            <td><span class="badge badge-muted">{{ $user->roleLabel() }}</span></td>
                            <td>
                                <span class="badge {{ $user->is_active ? 'badge-success' : 'badge-muted' }}">
                                    {{ $user->is_active ? 'Active' : 'Disabled' }}
                                </span>
                            </td>
                            <td>
                                <div class="table-actions">
                                    <a href="{{ route('admin.users.edit', $user) }}" class="btn btn-outline btn-sm">Edit</a>
                                    <a href="{{ route('admin.users.reset-password.form', $user) }}" class="btn btn-secondary btn-sm">Reset Password</a>
                                    @if ($user->id !== auth()->id())
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                            data-confirm-delete-btn
                                            data-delete-url="{{ route('admin.users.destroy', $user) }}"
                                        >
                                            Delete
                                        </button>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No users found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$users" />
</div>
@endsection
