@extends('layouts.app')

@section('title', 'Documents')
@section('page-title', 'Documents')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Documents</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.documents.create') }}" class="btn btn-primary btn-sm">Upload Document</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.documents.bulk-destroy') }}"
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
                        <th>Category</th>
                        <th>File</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($documents as $document)
                        <tr>
                            <x-admin-bulk-checkbox :id="$document->id" />
                            <td class="admin-table__sl-col">{{ ($documents->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $document->title }}</td>
                            <td>{{ $document->category ?? '—' }}</td>
                            <td><a href="{{ route('admin.files.documents', $document) }}" target="_blank" rel="noopener">{{ $document->file_name }}</a></td>
                            <td>
                                <span class="badge {{ $document->published ? 'badge-success' : 'badge-muted' }}">
                                    {{ $document->published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>{{ $document->sort_order }}</td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.documents.edit', $document)"
                                    :destroy-route="route('admin.documents.destroy', $document)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="8">No documents yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$documents" />
</div>
@endsection
