@extends('layouts.app')

@section('title', 'Navigation Menu')
@section('page-title', 'Navigation Menu')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>{{ $menuKey === 'footer' ? 'Footer Menu' : 'Header Menu' }}</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.menu-items.index', ['menu' => 'header']) }}" class="btn btn-sm {{ $menuKey === 'header' ? 'btn-primary' : 'btn-outline' }}">Header</a>
            <a href="{{ route('admin.menu-items.index', ['menu' => 'footer']) }}" class="btn btn-sm {{ $menuKey === 'footer' ? 'btn-primary' : 'btn-outline' }}">Footer</a>
            <a href="{{ route('admin.menu-items.create', ['menu' => $menuKey]) }}" class="btn btn-primary btn-sm">Add Item</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.menu-items.bulk-destroy', ['menu' => $menuKey]) }}"
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
                        <th>Label</th>
                        <th>Href</th>
                        <th>Children</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($menuItems as $menuItem)
                        <tr>
                            <x-admin-bulk-checkbox :id="$menuItem->id" />
                            <td class="admin-table__sl-col">{{ ($menuItems->firstItem() ?? 0) + $loop->index }}</td>
                            <td><strong>{{ $menuItem->label }}</strong></td>
                            <td>{{ $menuItem->href ?: '—' }}</td>
                            <td>{{ $menuItem->children->count() }}</td>
                            <td>{{ $menuItem->sort_order }}</td>
                            <td>
                                <span class="badge {{ $menuItem->is_visible ? 'badge-success' : 'badge-muted' }}">
                                    {{ $menuItem->is_visible ? 'Visible' : 'Hidden' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.menu-items.edit', $menuItem)"
                                    :destroy-route="route('admin.menu-items.destroy', $menuItem)"
                                />
                            </td>
                        </tr>
                        @foreach ($menuItem->children as $child)
                            <tr>
                                <x-admin-bulk-checkbox :id="$child->id" />
                                <td class="admin-table__sl-col">—</td>
                                <td style="padding-left:1.5rem;">↳ {{ $child->label }}</td>
                                <td>{{ $child->href }}</td>
                                <td>—</td>
                                <td>{{ $child->sort_order }}</td>
                                <td>
                                    <span class="badge {{ $child->is_visible ? 'badge-success' : 'badge-muted' }}">
                                        {{ $child->is_visible ? 'Visible' : 'Hidden' }}
                                    </span>
                                </td>
                                <td>
                                    <x-table-actions
                                        :edit-route="route('admin.menu-items.edit', $child)"
                                        :destroy-route="route('admin.menu-items.destroy', $child)"
                                    />
                                </td>
                            </tr>
                        @endforeach
                    @empty
                        <tr><td colspan="8">No menu items yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$menuItems" />
</div>
@endsection
