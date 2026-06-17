@extends('layouts.app')

@section('title', 'Sessions')
@section('page-title', 'Active Sessions')

@section('content')
<div class="admin-card">
    <div class="admin-card__header">
        <h2>Session Management</h2>
        <div class="admin-card__actions">
            <x-admin-per-page :selected="$selectedPerPage" />
        </div>
    </div>
    <div class="admin-table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th class="admin-table__sl-col">SL</th>
                    <th>User</th>
                    <th>IP Address</th>
                    <th>Last Activity</th>
                    <th>User Agent</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($sessions as $session)
                    <tr>
                        <td class="admin-table__sl-col">{{ ($sessions->firstItem() ?? 0) + $loop->index }}</td>
                        <td>
                            @if ($session->user_name)
                                {{ $session->user_name }} <small>({{ $session->username }})</small>
                            @else
                                Guest
                            @endif
                        </td>
                        <td>{{ $session->ip_address ?? '—' }}</td>
                        <td>{{ \Carbon\Carbon::createFromTimestamp($session->last_activity)->format('Y-m-d H:i:s') }}</td>
                        <td>{{ \Illuminate\Support\Str::limit($session->user_agent, 60) }}</td>
                        <td>
                            <form method="POST" action="{{ route('admin.sessions.destroy', $session->id) }}" onsubmit="return confirm('Revoke this session?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">Revoke</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6">No active sessions found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <x-admin-list-footer :paginator="$sessions" />
</div>
@endsection
