<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ActivityLogService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SessionController extends Controller
{
    public function index(Request $request)
    {
        $sessions = AdminPagination::paginate(
            DB::table('sessions')
                ->leftJoin('users', 'sessions.user_id', '=', 'users.id')
                ->select(
                    'sessions.id',
                    'sessions.user_id',
                    'sessions.ip_address',
                    'sessions.user_agent',
                    'sessions.last_activity',
                    'users.name as user_name',
                    'users.username',
                    'users.email',
                )
                ->orderByDesc('sessions.last_activity'),
            $request,
            20,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 20);

        return view('admin.sessions.index', compact('sessions', 'selectedPerPage'));
    }

    public function destroy(Request $request, string $sessionId, ActivityLogService $activityLog)
    {
        if ($sessionId === $request->session()->getId()) {
            return back()->with('error', 'You cannot revoke your own active session from this screen.');
        }

        $deleted = DB::table('sessions')->where('id', $sessionId)->delete();

        if ($deleted) {
            $activityLog->log(
                action: 'session_revoked',
                subject: $sessionId,
                description: 'Admin revoked a user session',
                user: $request->user(),
            );

            return back()->with('success', 'Session revoked successfully.');
        }

        return back()->with('error', 'Session not found or already expired.');
    }
}
