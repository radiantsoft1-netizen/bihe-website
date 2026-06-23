@extends('layouts.app')

@section('title', 'Info Corner Categories')
@section('page-title', 'Info Corner Categories')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Info Corner Categories</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <a href="{{ route('admin.info-corner-categories.create') }}" class="btn btn-primary btn-sm">New Category</a>
            <a href="{{ route('admin.info-corner-items.index') }}" class="btn btn-outline btn-sm">All Items</a>
        </div>
    </div>
    <div class="admin-table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th class="admin-table__sl-col">SL</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($categories as $category)
                    <tr>
                        <td class="admin-table__sl-col">{{ ($categories->firstItem() ?? 0) + $loop->index }}</td>
                        <td>{{ $category->name }}</td>
                        <td>{{ $category->slug }}</td>
                        <td>
                            <span class="badge {{ $category->published ? 'badge-success' : 'badge-muted' }}">
                                {{ $category->published ? 'Published' : 'Draft' }}
                            </span>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4">No categories yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <x-admin-list-footer :paginator="$categories" />
</div>
@endsection
