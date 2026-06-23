<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Announcement;
use App\Models\Document;
use App\Models\Faculty;
use App\Models\GalleryAlbum;
use App\Models\HeroBanner;
use App\Models\NewsEvent;
use App\Models\RecruitingPartner;
use App\Models\User;
use App\Support\AdminPermissions;
use App\Support\RoleAccess;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function build(User $user): array
    {
        $modules = RoleAccess::accessibleModules($user);
        $showSecurityPanel = $user->can(AdminPermissions::USERS_MANAGE)
            || $user->can(AdminPermissions::ACTIVITY_LOGS_VIEW);

        return [
            'role' => $user->role,
            'roleLabel' => $user->roleLabel(),
            'greeting' => $this->greeting(),
            'userInitials' => $this->initials($user->name),
            'modules' => $modules,
            'stats' => $this->moduleStats($user, $modules),
            'notifications' => $this->notifications($user, $modules),
            'recentActivity' => $this->recentActivity($user, $modules),
            'quickLinks' => RoleAccess::quickLinks($user),
            'showSecurityPanel' => $showSecurityPanel,
            'securityStats' => $showSecurityPanel ? $this->securityStats() : [],
        ];
    }

    protected function moduleStats(User $user, array $modules): array
    {
        $stats = [];

        if (in_array('announcements', $modules, true)) {
            $stats[] = $this->stat('announcements', 'Announcements', Announcement::count(), Announcement::active()->count());
        }
        if (in_array('hero-banners', $modules, true)) {
            $stats[] = $this->stat('hero-banners', 'Hero Banners', HeroBanner::count(), HeroBanner::active()->count());
        }
        if (in_array('recruiting-partners', $modules, true)) {
            $stats[] = $this->stat('recruiting-partners', 'Recruiting Partners', RecruitingPartner::count(), RecruitingPartner::active()->count());
        }
        if (in_array('faculty', $modules, true)) {
            $stats[] = $this->stat('faculty', 'Faculty', Faculty::count());
        }
        if (in_array('news-events', $modules, true)) {
            $stats[] = $this->stat('news-events', 'News & Events', NewsEvent::count(), NewsEvent::published()->count());
        }
        if (in_array('documents', $modules, true)) {
            $stats[] = $this->stat('documents', 'Documents', Document::count(), Document::published()->count());
        }
        if (in_array('gallery', $modules, true)) {
            $stats[] = $this->stat('gallery', 'Gallery Albums', GalleryAlbum::count(), GalleryAlbum::published()->count());
        }

        if ($user->can(AdminPermissions::USERS_MANAGE)) {
            $stats[] = $this->stat('users', 'Users', User::count(), User::where('is_active', true)->count());
        }

        return $stats;
    }

    protected function stat(string $key, string $label, int $total, ?int $live = null): array
    {
        $route = AdminPermissions::moduleMap()[$key]['route'] ?? null;

        return [
            'key' => $key,
            'label' => $label,
            'total' => $total,
            'live' => $live,
            'route' => $route,
            'accent' => $this->accentForKey($key),
        ];
    }

    protected function greeting(): string
    {
        $hour = (int) now()->format('G');

        return match (true) {
            $hour < 12 => 'morning',
            $hour < 17 => 'afternoon',
            default => 'evening',
        };
    }

    protected function initials(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];

        if ($parts === []) {
            return 'BI';
        }

        $first = strtoupper(substr($parts[0], 0, 1));
        $last = strtoupper(substr($parts[count($parts) - 1], 0, 1));

        return $first.($last !== $first ? $last : '');
    }

    protected function accentForKey(string $key): string
    {
        return match ($key) {
            'announcements', 'faculty', 'users' => 'maroon',
            'hero-banners', 'documents', 'sessions' => 'navy',
            'recruiting-partners', 'gallery', 'activity-logs' => 'gold',
            default => 'teal',
        };
    }

    protected function notifications(User $user, array $modules): array
    {
        $notifications = [];

        if (in_array('announcements', $modules, true)) {
            $inactive = Announcement::where('active', false)->count();
            if ($inactive > 0) {
                $notifications[] = $this->notice(
                    "{$inactive} inactive announcement(s) need review.",
                    route('admin.announcements.index')
                );
            }
        }

        if (in_array('news-events', $modules, true)) {
            $drafts = NewsEvent::where('published', false)->count();
            if ($drafts > 0) {
                $notifications[] = $this->notice(
                    "{$drafts} news item(s) are unpublished.",
                    route('admin.news-events.index')
                );
            }
        }

        if (in_array('documents', $modules, true)) {
            $drafts = Document::where('published', false)->count();
            if ($drafts > 0) {
                $notifications[] = $this->notice(
                    "{$drafts} document(s) are unpublished.",
                    route('admin.documents.index')
                );
            }
        }

        if (in_array('gallery', $modules, true)) {
            $drafts = GalleryAlbum::where('published', false)->count();
            if ($drafts > 0) {
                $notifications[] = $this->notice(
                    "{$drafts} gallery album(s) are unpublished.",
                    route('admin.gallery.index')
                );
            }
        }

        if ($user->can(AdminPermissions::ACTIVITY_LOGS_VIEW)) {
            $failedLogins = ActivityLog::where('action', 'login_failed')
                ->where('created_at', '>=', now()->subDay())
                ->count();

            if ($failedLogins > 0) {
                $notifications[] = $this->notice(
                    "{$failedLogins} failed login attempt(s) in the last 24 hours.",
                    route('admin.activity-logs.index'),
                    'alert'
                );
            }
        }

        if ($user->can(AdminPermissions::SESSIONS_MANAGE)) {
            $sessions = DB::table('sessions')->whereNotNull('user_id')->count();
            if ($sessions > 0) {
                $notifications[] = $this->notice(
                    "{$sessions} active user session(s) on the system.",
                    route('admin.sessions.index')
                );
            }
        }

        if ($notifications === []) {
            $notifications[] = [
                'type' => 'success',
                'message' => 'No pending alerts. All accessible modules look up to date.',
                'url' => null,
            ];
        }

        return $notifications;
    }

    protected function notice(string $message, ?string $url = null, string $type = 'warning'): array
    {
        return [
            'type' => $type,
            'message' => $message,
            'url' => $url,
        ];
    }

    protected function recentActivity(User $user, array $modules): Collection
    {
        if ($user->can(AdminPermissions::ACTIVITY_LOGS_VIEW)) {
            return ActivityLog::with('user')
                ->orderByDesc('created_at')
                ->limit(8)
                ->get()
                ->map(fn (ActivityLog $log) => [
                    'title' => $log->description ?? $log->action,
                    'meta' => ($log->user?->name ?? 'System').' · '.$log->action,
                    'at' => $log->created_at,
                    'url' => route('admin.activity-logs.index'),
                    'kind' => $this->activityKind($log->action),
                ]);
        }

        $items = collect();

        if (in_array('announcements', $modules, true)) {
            $items = $items->merge($this->contentUpdates(Announcement::class, 'Announcements', 'admin.announcements.edit', 'message'));
        }
        if (in_array('hero-banners', $modules, true)) {
            $items = $items->merge($this->contentUpdates(HeroBanner::class, 'Hero Banners', 'admin.hero-banners.edit'));
        }
        if (in_array('recruiting-partners', $modules, true)) {
            $items = $items->merge($this->contentUpdates(RecruitingPartner::class, 'Recruiting Partners', 'admin.recruiting-partners.edit', 'name'));
        }
        if (in_array('faculty', $modules, true)) {
            $items = $items->merge($this->contentUpdates(Faculty::class, 'Faculty', 'admin.faculty.edit'));
        }
        if (in_array('news-events', $modules, true)) {
            $items = $items->merge($this->contentUpdates(NewsEvent::class, 'News & Events', 'admin.news-events.edit', 'title'));
        }
        if (in_array('documents', $modules, true)) {
            $items = $items->merge($this->contentUpdates(Document::class, 'Documents', 'admin.documents.edit'));
        }
        if (in_array('gallery', $modules, true)) {
            $items = $items->merge($this->contentUpdates(GalleryAlbum::class, 'Gallery', 'admin.gallery.edit'));
        }

        return $items->sortByDesc('at')->take(8)->values();
    }

    protected function contentUpdates(string $model, string $module, string $routeName, string $titleField = 'title'): Collection
    {
        return $model::query()
            ->latest('updated_at')
            ->limit(3)
            ->get()
            ->map(fn ($record) => [
                'title' => $record->{$titleField} ?? $record->message ?? $module,
                'meta' => $module.' · updated',
                'at' => $record->updated_at,
                'url' => route($routeName, $record),
                'kind' => 'content',
            ]);
    }

    protected function securityStats(): array
    {
        return [
            'failed_logins' => ActivityLog::where('action', 'login_failed')->where('created_at', '>=', now()->subDay())->count(),
            'active_sessions' => DB::table('sessions')->whereNotNull('user_id')->count(),
            'total_users' => User::count(),
        ];
    }

    protected function activityKind(string $action): string
    {
        return match (true) {
            str_contains($action, 'login_failed'),
            str_contains($action, 'blocked') => 'danger',
            $action === 'login' => 'success',
            str_contains($action, '_updated'),
            str_contains($action, 'updated') => 'content',
            default => 'default',
        };
    }
}
