@extends('layouts.app')

@section('title', 'Alumni Profiles')
@section('page-title', 'Alumni Profiles')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Alumni Profiles</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <button
                type="button"
                id="alumni-profiles-sort-orders-save"
                class="btn btn-outline btn-sm"
                data-sort-orders-url="{{ route('admin.alumni-profiles.sort-orders') }}"
                disabled
            >
                Update Display Order
            </button>
            <a href="{{ route('admin.alumni-profiles.create') }}" class="btn btn-primary btn-sm">Add Alumni</a>
        </div>
    </div>

    <form method="GET" action="{{ route('admin.alumni-profiles.index') }}" class="admin-filters">
        <div class="admin-filters__field admin-filters__field--search">
            <label class="admin-filters__label" for="alumni-filter-q">Search</label>
            <input
                type="search"
                id="alumni-filter-q"
                name="q"
                class="form-input"
                placeholder="Name, email, company…"
                value="{{ request('q') }}"
            >
        </div>
        <div class="admin-filters__field admin-filters__field--status">
            <label class="admin-filters__label" for="alumni-filter-status">Status</label>
            <select id="alumni-filter-status" name="status" class="form-select">
                <option value="">All statuses</option>
                @foreach (config('alumni.approval_statuses', []) as $value => $label)
                    <option value="{{ $value }}" @selected(request('status') === $value)>{{ $label }}</option>
                @endforeach
            </select>
        </div>
        <div class="admin-filters__field admin-filters__field--program">
            <label class="admin-filters__label" for="alumni-filter-program">Program</label>
            <select id="alumni-filter-program" name="program" class="form-select">
                <option value="">All programs</option>
                @foreach (config('alumni.programs', []) as $program)
                    <option value="{{ $program }}" @selected(request('program') === $program)>{{ $program }}</option>
                @endforeach
            </select>
        </div>
        <div class="admin-filters__actions">
            <button type="submit" class="btn btn-primary btn-sm">Filter</button>
            @if (request()->hasAny(['q', 'status', 'program']))
                <a href="{{ route('admin.alumni-profiles.index') }}" class="btn btn-outline btn-sm">Clear</a>
            @endif
        </div>
    </form>

    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.alumni-profiles.bulk-destroy') }}"
        data-admin-bulk-delete-form
    >
        @csrf
        @method('DELETE')
        <div class="admin-table-wrap">
            <table class="admin-table" id="alumni-profiles-sort-orders-table">
                <thead>
                    <tr>
                        <x-admin-bulk-checkbox-all />
                        <th class="admin-table__sl-col">Sl. No.</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Program</th>
                        <th>Passout</th>
                        <th>Status</th>
                        <th>Source</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($profiles as $profile)
                        <tr>
                            <x-admin-bulk-checkbox :id="$profile->id" />
                            <td class="admin-table__sl-col">{{ $profiles->firstItem() + $loop->index }}</td>
                            <td>
                                @if ($profile->photo_path)
                                    <span class="admin-faculty-thumb">
                                        <img src="{{ \App\Support\StoredFileUrl::publicImage($profile->photo_path) }}" alt="" class="thumb-preview">
                                    </span>
                                @else
                                    —
                                @endif
                            </td>
                            <td>{{ $profile->name }}</td>
                            <td>{{ $profile->program }}</td>
                            <td>{{ $profile->displayPassoutYear() ?? '—' }}</td>
                            <td>
                                @php
                                    $statusClass = match ($profile->approval_status) {
                                        'approved' => 'badge-success',
                                        'pending' => 'badge-warning',
                                        'rejected' => 'badge-danger',
                                        default => 'badge-muted',
                                    };
                                @endphp
                                <span class="badge {{ $statusClass }}">
                                    {{ ucfirst($profile->approval_status ?? 'approved') }}
                                </span>
                                @if ($profile->is_featured)
                                    <span class="badge badge-info">Featured</span>
                                @endif
                            </td>
                            <td>{{ $profile->source === 'registration' ? 'Self-registered' : 'Admin' }}</td>
                            <td>
                                <input
                                    type="number"
                                    class="form-input admin-table__order-input"
                                    min="0"
                                    step="1"
                                    value="{{ $profile->sort_order }}"
                                    data-alumni-profile-id="{{ $profile->id }}"
                                    data-initial-order="{{ $profile->sort_order }}"
                                    aria-label="Display order for {{ $profile->name }}"
                                >
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.alumni-profiles.edit', $profile)"
                                    :destroy-route="route('admin.alumni-profiles.destroy', $profile)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="10" class="admin-table__empty">No alumni profiles yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>

    {{ $profiles->links() }}
</div>
@endsection
