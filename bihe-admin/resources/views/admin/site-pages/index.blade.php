@extends('layouts.app')

@section('title', 'Site Pages')
@section('page-title', 'Site Pages')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Site Pages</h2>
        <div class="admin-card__actions">
            <form method="POST" action="{{ route('admin.site-pages.import-all-content') }}" style="display:inline;">
                @csrf
                <button type="submit" class="btn btn-outline btn-sm">Load all website content</button>
            </form>
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.site-pages.create') }}" class="btn btn-primary btn-sm">Add Page</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.site-pages.bulk-destroy') }}"
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
                        <th>Path</th>
                        <th>Title</th>
                        <th>Section</th>
                        <th>Template</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($sitePages as $sitePage)
                        <tr>
                            <x-admin-bulk-checkbox :id="$sitePage->id" />
                            <td class="admin-table__sl-col">{{ ($sitePages->firstItem() ?? 0) + $loop->index }}</td>
                            <td><code>{{ $sitePage->path }}</code></td>
                            <td>{{ $sitePage->title }}</td>
                            <td>{{ $sitePage->section ?: '—' }}</td>
                            <td>{{ $sitePage->template_key }}</td>
                            <td>
                                <span class="badge {{ $sitePage->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $sitePage->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.site-pages.edit', $sitePage)"
                                    :destroy-route="route('admin.site-pages.destroy', $sitePage)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No site pages yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$sitePages" />
</div>
@endsection
