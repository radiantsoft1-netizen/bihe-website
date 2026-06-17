@extends('layouts.app')

@section('title', 'Faculty & Staff')
@section('page-title', 'Faculty & Staff')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Faculty & Staff</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <button
                type="button"
                id="faculty-sort-orders-save"
                class="btn btn-outline btn-sm"
                data-sort-orders-url="{{ route('admin.faculty.sort-orders') }}"
                disabled
            >
                Update Display Order
            </button>
            <a href="{{ route('admin.faculty.create') }}" class="btn btn-primary btn-sm">Add Member</a>
        </div>
    </div>

    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
        <a href="{{ route('admin.faculty.index') }}" class="btn btn-outline btn-sm">All</a>
        @foreach ($departments as $department)
            <a href="{{ route('admin.faculty.index', ['department' => $department->slug]) }}"
               class="btn btn-outline btn-sm">
                {{ $department->name }}
            </a>
        @endforeach
    </div>

    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.faculty.bulk-destroy') }}"
        data-admin-bulk-delete-form
    >
        @csrf
        @method('DELETE')
        <div class="admin-table-wrap admin-table-wrap--faculty">
            <table class="admin-table" id="faculty-sort-orders-table">
                <thead>
                    <tr>
                        <x-admin-bulk-checkbox-all />
                        <th class="admin-table__sl-col">Sl. No.</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Section</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($faculty as $member)
                        <tr>
                            <x-admin-bulk-checkbox :id="$member->id" />
                            <td class="admin-table__sl-col">{{ $faculty->firstItem() + $loop->index }}</td>
                            <td>
                                @if ($member->photo_path)
                                    <span class="admin-faculty-thumb">
                                        <img src="{{ \App\Support\StoredFileUrl::publicImage($member->photo_path) }}" alt="" class="thumb-preview">
                                    </span>
                                @else
                                    —
                                @endif
                            </td>
                            <td>{{ $member->name }}</td>
                            <td>{{ $member->designation }}</td>
                            <td>{{ $member->departmentLabel() }}</td>
                            <td>
                                <span class="badge {{ $member->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $member->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-input admin-table__order-input"
                                    min="0"
                                    step="1"
                                    value="{{ $member->sort_order }}"
                                    data-faculty-id="{{ $member->id }}"
                                    data-initial-order="{{ $member->sort_order }}"
                                    aria-label="Display order for {{ $member->name }}"
                                >
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.faculty.edit', $member)"
                                    :destroy-route="route('admin.faculty.destroy', $member)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="9">No faculty or staff members yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$faculty" />
</div>
@endsection
