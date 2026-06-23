<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\User;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class AdminActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = AdminActivityLog::query()
            ->select([
                'id',
                'user_id',
                'action',
                'action_type',
                'description',
                'resource',
                'resource_id',
                'ip_address',
                'browser',
                'platform',
                'device',
                'created_at',
            ])
            ->with('user:id,name')
            ->orderByDesc('created_at');

        if ($request->filled('action')) {
            $query->where('action', $request->query('action'));
        }

        if ($request->filled('action_type')) {
            $query->where('action_type', $request->query('action_type'));
        }

        if ($request->filled('resource')) {
            $query->where('resource', $request->query('resource'));
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->query('user_id'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->query('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->query('date_to'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($builder) use ($search): void {
                $builder->where('description', 'like', "%{$search}%")
                    ->orWhere('resource', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('browser', 'like', "%{$search}%");
            });
        }

        $logs = AdminPagination::paginate($query, $request, 25);
        $selectedPerPage = AdminPagination::selectedPerPage($request, 25);

        $actions = AdminActivityLog::query()
            ->select('action')
            ->distinct()
            ->orderBy('action')
            ->pluck('action');

        $resources = AdminActivityLog::query()
            ->select('resource')
            ->whereNotNull('resource')
            ->distinct()
            ->orderBy('resource')
            ->pluck('resource');

        $users = User::orderBy('name')->get(['id', 'name', 'username']);

        return view('admin.activity-logs.index', compact('logs', 'actions', 'resources', 'users', 'selectedPerPage'));
    }
}
