@extends('layouts.app')

@section('title', 'Hero Banners')
@section('page-title', 'Hero Banners')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Hero Banners</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.hero-banners.create') }}" class="btn btn-primary btn-sm">Add Hero Banner</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.hero-banners.bulk-destroy') }}"
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
                        <th>Image</th>
                        <th>Title</th>
                        <th>Eyebrow</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($heroBanners as $heroBanner)
                        <tr>
                            <x-admin-bulk-checkbox :id="$heroBanner->id" />
                            <td class="admin-table__sl-col">{{ ($heroBanners->firstItem() ?? 0) + $loop->index }}</td>
                            <td>
                                @if ($heroBanner->image_path)
                                    <x-storage-image :path="$heroBanner->image_path" alt="" />
                                @else
                                    —
                                @endif
                            </td>
                            <td>{{ \Illuminate\Support\Str::limit($heroBanner->title, 50) }}</td>
                            <td>{{ \Illuminate\Support\Str::limit($heroBanner->eyebrow, 40) }}</td>
                            <td>{{ $heroBanner->sort_order }}</td>
                            <td>
                                <span class="badge {{ $heroBanner->active ? 'badge-success' : 'badge-muted' }}">
                                    {{ $heroBanner->active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.hero-banners.edit', $heroBanner)"
                                    :destroy-route="route('admin.hero-banners.destroy', $heroBanner)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No hero banners yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$heroBanners" />
</div>
@endsection
