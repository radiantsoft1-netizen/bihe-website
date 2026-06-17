@extends('layouts.app')

@section('title', 'Recruiting Partners')
@section('page-title', 'Recruiting Partners')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Recruiting Partners</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.recruiting-partners.create') }}" class="btn btn-primary btn-sm">Add Partner</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.recruiting-partners.bulk-destroy') }}"
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
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($recruitingPartners as $recruitingPartner)
                        <tr>
                            <x-admin-bulk-checkbox :id="$recruitingPartner->id" />
                            <td class="admin-table__sl-col">{{ ($recruitingPartners->firstItem() ?? 0) + $loop->index }}</td>
                            <td>
                                @if ($recruitingPartner->logo_path)
                                    <img src="{{ asset('storage/'.$recruitingPartner->logo_path) }}" alt="" class="thumb-preview">
                                @else
                                    —
                                @endif
                            </td>
                            <td>{{ $recruitingPartner->name }}</td>
                            <td>{{ $recruitingPartner->sort_order }}</td>
                            <td>
                                <span class="badge {{ $recruitingPartner->active ? 'badge-success' : 'badge-muted' }}">
                                    {{ $recruitingPartner->active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.recruiting-partners.edit', $recruitingPartner)"
                                    :destroy-route="route('admin.recruiting-partners.destroy', $recruitingPartner)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="7">No recruiting partners yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$recruitingPartners" />
</div>
@endsection
