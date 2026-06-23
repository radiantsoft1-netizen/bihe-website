@extends('layouts.app')

@section('title', 'Programs')
@section('page-title', 'Programs')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>All Programs</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
            <x-admin-bulk-delete-button />
            <a href="{{ route('admin.programs.create') }}" class="btn btn-primary btn-sm">Add Program</a>
        </div>
    </div>
    <form
        id="admin-bulk-delete-form"
        method="POST"
        action="{{ route('admin.programs.bulk-destroy') }}"
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
                        <th>Level</th>
                        <th>Program</th>
                        <th>Duration</th>
                        <th>Intake</th>
                        <th>Department</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($programs as $program)
                        <tr>
                            <x-admin-bulk-checkbox :id="$program->id" />
                            <td class="admin-table__sl-col">{{ ($programs->firstItem() ?? 0) + $loop->index }}</td>
                            <td>{{ $program->level }}</td>
                            <td>{{ $program->program_name }}</td>
                            <td>{{ $program->duration }}</td>
                            <td>{{ $program->intake }}</td>
                            <td>{{ strtoupper($program->department) }}</td>
                            <td>{{ $program->sort_order }}</td>
                            <td>
                                <x-table-actions
                                    :edit-route="route('admin.programs.edit', $program)"
                                    :destroy-route="route('admin.programs.destroy', $program)"
                                />
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="9">No programs yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </form>
    <x-admin-list-footer :paginator="$programs" />
</div>
@endsection
