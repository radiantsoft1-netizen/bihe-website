<?php

namespace App\Support;

use App\Enums\UserRole;

class AdminPermissions
{
    public const GUARD = 'web';

    public const DASHBOARD_VIEW = 'dashboard.view';

    public const ANNOUNCEMENTS_MANAGE = 'announcements.manage';

    public const FACULTY_MANAGE = 'faculty.manage';

    public const GOVERNING_BODIES_MANAGE = 'governing-bodies.manage';

    public const NAVIGATION_MANAGE = 'navigation.manage';

    public const SITE_PAGES_MANAGE = 'site-pages.manage';

    public const RDC_PROJECTS_MANAGE = 'rdc-projects.manage';

    public const INFO_CORNER_MANAGE = 'info-corner.manage';

    public const PLACEMENT_DRIVES_MANAGE = 'placement-drives.manage';

    public const ALUMNI_MANAGE = 'alumni.manage';

    public const CIRCULAR_NOTICES_MANAGE = 'circular-notices.manage';

    public const NEWS_MANAGE = 'news.manage';

    public const DOCUMENTS_MANAGE = 'documents.manage';

    public const GALLERY_MANAGE = 'gallery.manage';

    public const HERO_BANNERS_MANAGE = 'hero-banners.manage';

    public const RECRUITING_PARTNERS_MANAGE = 'recruiting-partners.manage';

    public const USERS_MANAGE = 'users.manage';

    public const ACTIVITY_LOGS_VIEW = 'activity-logs.view';

    public const SESSIONS_MANAGE = 'sessions.manage';

    public const MEDIA_LIBRARY_VIEW = 'media-library.view';

    public const SETTINGS_MANAGE = 'settings.manage';

    /** @return list<string> */
    public static function all(): array
    {
        return [
            self::DASHBOARD_VIEW,
            self::ANNOUNCEMENTS_MANAGE,
            self::FACULTY_MANAGE,
            self::GOVERNING_BODIES_MANAGE,
            self::NAVIGATION_MANAGE,
            self::SITE_PAGES_MANAGE,
            self::RDC_PROJECTS_MANAGE,
            self::INFO_CORNER_MANAGE,
            self::PLACEMENT_DRIVES_MANAGE,
            self::ALUMNI_MANAGE,
            self::CIRCULAR_NOTICES_MANAGE,
            self::NEWS_MANAGE,
            self::DOCUMENTS_MANAGE,
            self::GALLERY_MANAGE,
            self::HERO_BANNERS_MANAGE,
            self::RECRUITING_PARTNERS_MANAGE,
            self::USERS_MANAGE,
            self::ACTIVITY_LOGS_VIEW,
            self::SESSIONS_MANAGE,
            self::MEDIA_LIBRARY_VIEW,
            self::SETTINGS_MANAGE,
        ];
    }

    /** @return list<string> */
    public static function settingsModuleSlugs(): array
    {
        return [
            'navigation',
            'prospectus',
            'site-maintenance',
            'site-pages',
            'media-library',
            'users',
            'activity-logs',
            'sessions',
        ];
    }

    /**
     * Admin sidebar modules keyed by internal module slug.
     *
     * @return array<string, array{permission: string, label: string, route: string, pattern: string|list<string>, children?: list<array{label: string, route: string, pattern: string|list<string>}>}>
     */
    public static function moduleMap(): array
    {
        return [
            'dashboard' => [
                'permission' => self::DASHBOARD_VIEW,
                'label' => 'Dashboard',
                'route' => 'admin.dashboard',
                'pattern' => 'admin.dashboard',
            ],
            'announcements' => [
                'permission' => self::ANNOUNCEMENTS_MANAGE,
                'label' => 'Announcements',
                'route' => 'admin.announcements.index',
                'pattern' => 'admin.announcements.*',
            ],
            'hero-banners' => [
                'permission' => self::HERO_BANNERS_MANAGE,
                'label' => 'Hero Banners',
                'route' => 'admin.hero-banners.index',
                'pattern' => 'admin.hero-banners.*',
            ],
            'recruiting-partners' => [
                'permission' => self::RECRUITING_PARTNERS_MANAGE,
                'label' => 'Recruiting Partners',
                'route' => 'admin.recruiting-partners.index',
                'pattern' => 'admin.recruiting-partners.*',
            ],
            'faculty' => [
                'permission' => self::FACULTY_MANAGE,
                'label' => 'Faculty',
                'route' => 'admin.faculty.index',
                'pattern' => 'admin.faculty.*',
            ],
            'governing-bodies' => [
                'permission' => self::GOVERNING_BODIES_MANAGE,
                'label' => 'Governing Bodies',
                'route' => 'admin.governing-bodies.index',
                'pattern' => 'admin.governing-bodies.*',
            ],
            'research-development-cell' => [
                'permission' => self::RDC_PROJECTS_MANAGE,
                'label' => 'Research & Development Cell',
                'route' => 'admin.research-development-cell.edit',
                'pattern' => 'admin.research-development-cell.*',
            ],
            'navigation' => [
                'permission' => self::NAVIGATION_MANAGE,
                'label' => 'Navigation',
                'route' => 'admin.menu-items.index',
                'pattern' => 'admin.menu-items.*',
            ],
            'prospectus' => [
                'permission' => self::SETTINGS_MANAGE,
                'label' => 'Prospectus',
                'route' => 'admin.settings.prospectus.edit',
                'pattern' => 'admin.settings.prospectus.*',
            ],
            'site-maintenance' => [
                'permission' => self::SETTINGS_MANAGE,
                'label' => 'Website Maintenance',
                'route' => 'admin.settings.site-maintenance.edit',
                'pattern' => 'admin.settings.site-maintenance.*',
            ],
            'site-pages' => [
                'permission' => self::SITE_PAGES_MANAGE,
                'label' => 'Site Pages',
                'route' => 'admin.site-pages.index',
                'pattern' => 'admin.site-pages.*',
            ],
            'circular-notices' => [
                'permission' => self::CIRCULAR_NOTICES_MANAGE,
                'label' => 'Circular Notices',
                'route' => 'admin.circular-notices.index',
                'pattern' => 'admin.circular-notices.*',
            ],
            'placement-drives' => [
                'permission' => self::PLACEMENT_DRIVES_MANAGE,
                'label' => 'Placement Drives',
                'route' => 'admin.placement-drives.index',
                'pattern' => 'admin.placement-drives.*',
            ],
            'alumni' => [
                'permission' => self::ALUMNI_MANAGE,
                'label' => 'Alumni',
                'route' => 'admin.alumni-profiles.index',
                'pattern' => ['admin.alumni-profiles.*', 'admin.alumni-events.*'],
                'children' => [
                    [
                        'label' => 'Profiles',
                        'route' => 'admin.alumni-profiles.index',
                        'pattern' => 'admin.alumni-profiles.*',
                    ],
                    [
                        'label' => 'Events',
                        'route' => 'admin.alumni-events.index',
                        'pattern' => 'admin.alumni-events.*',
                    ],
                ],
            ],
            'info-corner' => [
                'permission' => self::INFO_CORNER_MANAGE,
                'label' => 'Info Corner',
                'route' => 'admin.info-corner-items.index',
                'pattern' => ['admin.info-corner-items.*', 'admin.info-corner-categories.*'],
                'children' => [
                    [
                        'label' => 'All Items',
                        'route' => 'admin.info-corner-items.index',
                        'pattern' => 'admin.info-corner-items.*',
                    ],
                    [
                        'label' => 'Categories',
                        'route' => 'admin.info-corner-categories.index',
                        'pattern' => 'admin.info-corner-categories.*',
                    ],
                ],
            ],
            'documents' => [
                'permission' => self::DOCUMENTS_MANAGE,
                'label' => 'Documents',
                'route' => 'admin.documents.index',
                'pattern' => 'admin.documents.*',
            ],
            'gallery' => [
                'permission' => self::GALLERY_MANAGE,
                'label' => 'Gallery',
                'route' => 'admin.gallery.index',
                'pattern' => ['admin.gallery.*', 'admin.gallery-categories.*'],
            ],
            'media-library' => [
                'permission' => self::MEDIA_LIBRARY_VIEW,
                'label' => 'Media Library',
                'route' => 'admin.media-library.index',
                'pattern' => 'admin.media-library.*',
            ],
            'users' => [
                'permission' => self::USERS_MANAGE,
                'label' => 'Users',
                'route' => 'admin.users.index',
                'pattern' => 'admin.users.*',
            ],
            'activity-logs' => [
                'permission' => self::ACTIVITY_LOGS_VIEW,
                'label' => 'Activity Logs',
                'route' => 'admin.activity-logs.index',
                'pattern' => 'admin.activity-logs.*',
            ],
            'sessions' => [
                'permission' => self::SESSIONS_MANAGE,
                'label' => 'Sessions',
                'route' => 'admin.sessions.index',
                'pattern' => 'admin.sessions.*',
            ],
        ];
    }

    /** @return list<string> */
    public static function forRole(UserRole|string $role): array
    {
        $roleValue = $role instanceof UserRole ? $role->value : (string) $role;

        return match ($roleValue) {
            UserRole::SuperAdmin->value => self::all(),
            UserRole::Admin->value => [
                self::DASHBOARD_VIEW,
                self::ANNOUNCEMENTS_MANAGE,
                self::FACULTY_MANAGE,
                self::GOVERNING_BODIES_MANAGE,
                self::NAVIGATION_MANAGE,
                self::SITE_PAGES_MANAGE,
                self::RDC_PROJECTS_MANAGE,
                self::INFO_CORNER_MANAGE,
                self::PLACEMENT_DRIVES_MANAGE,
                self::ALUMNI_MANAGE,
                self::CIRCULAR_NOTICES_MANAGE,
                self::NEWS_MANAGE,
                self::DOCUMENTS_MANAGE,
                self::GALLERY_MANAGE,
                self::MEDIA_LIBRARY_VIEW,
                self::HERO_BANNERS_MANAGE,
                self::RECRUITING_PARTNERS_MANAGE,
                self::SETTINGS_MANAGE,
            ],
            UserRole::Staff->value => [
                self::DASHBOARD_VIEW,
                self::ANNOUNCEMENTS_MANAGE,
                self::INFO_CORNER_MANAGE,
                self::PLACEMENT_DRIVES_MANAGE,
                self::ALUMNI_MANAGE,
                self::CIRCULAR_NOTICES_MANAGE,
                self::NEWS_MANAGE,
                self::DOCUMENTS_MANAGE,
                self::GALLERY_MANAGE,
                self::RDC_PROJECTS_MANAGE,
                self::MEDIA_LIBRARY_VIEW,
            ],
            default => [self::DASHBOARD_VIEW],
        };
    }
}
