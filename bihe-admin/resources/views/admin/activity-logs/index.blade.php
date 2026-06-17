@extends('layouts.app')

@section('title', 'Activity Logs')
@section('page-title', 'Activity Logs')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Admin Activity Logs</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
        </div>
    </div>

    <form method="GET" action="{{ route('admin.activity-logs.index') }}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem;margin-bottom:1rem;align-items:end;">
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="q">Search</label>
            <input type="text" id="q" name="q" class="form-input" value="{{ request('q') }}" placeholder="Description, IP, browser…">
        </div>
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="action_type">Type</label>
            <select id="action_type" name="action_type" class="form-select">
                <option value="">All types</option>
                <option value="auth" @selected(request('action_type') === 'auth')>Auth</option>
                <option value="crud" @selected(request('action_type') === 'crud')>CRUD</option>
                <option value="security" @selected(request('action_type') === 'security')>Security</option>
            </select>
        </div>
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="action">Action</label>
            <select id="action" name="action" class="form-select">
                <option value="">All actions</option>
                @foreach ($actions as $actionOption)
                    <option value="{{ $actionOption }}" @selected(request('action') === $actionOption)>
                        {{ str_replace('_', ' ', $actionOption) }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="resource">Resource</label>
            <select id="resource" name="resource" class="form-select">
                <option value="">All resources</option>
                @foreach ($resources as $resourceOption)
                    <option value="{{ $resourceOption }}" @selected(request('resource') === $resourceOption)>
                        {{ str_replace('-', ' ', $resourceOption) }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="user_id">User</label>
            <select id="user_id" name="user_id" class="form-select">
                <option value="">All users</option>
                @foreach ($users as $userOption)
                    <option value="{{ $userOption->id }}" @selected((string) request('user_id') === (string) $userOption->id)>
                        {{ $userOption->name }} ({{ $userOption->username }})
                    </option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="date_from">From</label>
            <input type="date" id="date_from" name="date_from" class="form-input" value="{{ request('date_from') }}">
        </div>
        <div class="form-group" style="margin:0;">
            <label class="form-label" for="date_to">To</label>
            <input type="date" id="date_to" name="date_to" class="form-input" value="{{ request('date_to') }}">
        </div>
        <div style="display:flex;gap:0.5rem;">
            <button type="submit" class="btn btn-primary btn-sm">Filter</button>
            <a href="{{ route('admin.activity-logs.index') }}" class="btn btn-outline btn-sm">Reset</a>
        </div>
    </form>

    <div class="admin-table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th class="admin-table__sl-col">SL</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Action</th>
                    <th>User</th>
                    <th>Resource</th>
                    <th>Description</th>
                    <th>IP</th>
                    <th>Browser / Device</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($logs as $log)
                    <tr>
                        <td class="admin-table__sl-col">{{ ($logs->firstItem() ?? 0) + $loop->index }}</td>
                        <td>{{ $log->created_at?->format('Y-m-d H:i') }}</td>
                        <td>
                            @if ($log->action_type)
                                <span class="badge badge-muted">{{ $log->action_type }}</span>
                            @else
                                —
                            @endif
                        </td>
                        <td><span class="badge badge-muted">{{ $log->actionLabel() }}</span></td>
                        <td>{{ $log->user?->name ?? '—' }}</td>
                        <td>
                            @if ($log->resource)
                                {{ str_replace('-', ' ', $log->resource) }}
                                @if ($log->resource_id)
                                    <small>(#{{ $log->resource_id }})</small>
                                @endif
                            @else
                                —
                            @endif
                        </td>
                        <td>{{ $log->description ?? '—' }}</td>
                        <td>{{ $log->ip_address ?? '—' }}</td>
                        <td>{{ $log->deviceSummary() }}</td>
                    </tr>
                @empty
                    <tr><td colspan="9">No activity logged yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <x-admin-list-footer :paginator="$logs" />
</div>
@endsection
