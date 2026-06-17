<?php

/**
 * BIHE Admin — module registry.
 *
 * Single source of truth for admin module metadata: permission prefixes,
 * sidebar labels, route patterns, and API prefixes. Phase 1 modules are
 * enabled; future modules are registered with enabled: false until implemented.
 *
 * @see docs/FUTURE-PHASES.md
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Phase 1 — content modules (live)
    |--------------------------------------------------------------------------
    */

    'announcements' => [
        'enabled' => true,
        'label' => 'Announcements',
        'group' => 'content',
        'permission_prefix' => 'content.announcements',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.announcements.index',
        'admin_route_pattern' => 'admin.announcements.*',
        'api_prefix' => '/api/v1/announcements',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => null,
    ],

    'programs' => [
        'enabled' => false,
        'label' => 'Programs',
        'group' => 'content',
        'permission_prefix' => 'content.programs',
        'permissions' => ['view', 'manage'],
        'admin_route' => null,
        'admin_route_pattern' => null,
        'api_prefix' => '/api/v1/programs',
        'roles' => [],
        'service' => null,
        'note' => 'API only — managed as static pages on the public site.',
    ],

    'faculty' => [
        'enabled' => true,
        'label' => 'Faculty',
        'group' => 'content',
        'permission_prefix' => 'content.faculty',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.faculty.index',
        'admin_route_pattern' => 'admin.faculty.*',
        'api_prefix' => '/api/v1/faculty',
        'roles' => ['super_admin', 'admin'],
        'service' => null,
    ],

    'news-events' => [
        'enabled' => true,
        'label' => 'News & Events',
        'group' => 'content',
        'permission_prefix' => 'content.news',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.news-events.index',
        'admin_route_pattern' => 'admin.news-events.*',
        'api_prefix' => '/api/v1/news',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => 'App\\Services\\NewsEventService',
    ],

    'circular-notices' => [
        'enabled' => true,
        'label' => 'Circular Notices',
        'group' => 'content',
        'permission_prefix' => 'content.circular_notices',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.circular-notices.index',
        'admin_route_pattern' => 'admin.circular-notices.*',
        'api_prefix' => '/api/v1/circular-notices',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => 'App\\Services\\CircularNoticeService',
    ],

    'info-corner' => [
        'enabled' => true,
        'label' => 'Info Corner',
        'group' => 'content',
        'permission_prefix' => 'content.info_corner',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.info-corner-items.index',
        'admin_route_pattern' => ['admin.info-corner-items.*', 'admin.info-corner-categories.*'],
        'api_prefix' => '/api/v1/info-corner',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => 'App\\Services\\InfoCornerItemService',
    ],

    'documents' => [
        'enabled' => true,
        'label' => 'Documents',
        'group' => 'content',
        'permission_prefix' => 'content.documents',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.documents.index',
        'admin_route_pattern' => 'admin.documents.*',
        'api_prefix' => '/api/v1/documents',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => null,
        'upload_directory' => 'document',
    ],

    'gallery' => [
        'enabled' => true,
        'label' => 'Gallery',
        'group' => 'content',
        'permission_prefix' => 'content.gallery',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.gallery.index',
        'admin_route_pattern' => 'admin.gallery.*',
        'api_prefix' => '/api/v1/gallery',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => 'App\\Services\\GalleryAlbumService',
    ],

    'hero-banners' => [
        'enabled' => true,
        'label' => 'Hero Banners',
        'group' => 'content',
        'permission_prefix' => 'content.hero_banners',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.hero-banners.index',
        'admin_route_pattern' => 'admin.hero-banners.*',
        'api_prefix' => '/api/v1/hero-banners',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => null,
        'upload_directory' => 'hero_banner',
    ],

    'recruiting-partners' => [
        'enabled' => true,
        'label' => 'Recruiting Partners',
        'group' => 'content',
        'permission_prefix' => 'content.recruiting_partners',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.recruiting-partners.index',
        'admin_route_pattern' => 'admin.recruiting-partners.*',
        'api_prefix' => '/api/v1/recruiting-partners',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => null,
        'upload_directory' => 'recruiting_partner',
    ],

    'governing-bodies' => [
        'enabled' => true,
        'label' => 'Governing Bodies',
        'group' => 'content',
        'permission_prefix' => 'content.governing_bodies',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.governing-bodies.index',
        'admin_route_pattern' => 'admin.governing-bodies.*',
        'api_prefix' => '/api/v1/governing-bodies',
        'roles' => ['super_admin', 'admin'],
        'service' => null,
        'upload_directory' => 'governing_body',
        'extends_static_routes' => ['/governing-bodies'],
    ],

    'research-development-cell' => [
        'enabled' => true,
        'label' => 'Research & Development Cell',
        'group' => 'content',
        'permission_prefix' => 'content.rdc_projects',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.research-development-cell.edit',
        'admin_route_pattern' => 'admin.research-development-cell.*',
        'api_prefix' => '/api/v1/site-pages',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => 'App\\Services\\RdcSitePageContentService',
        'upload_directory' => 'rdc_project',
        'extends_static_routes' => ['/research/research-and-development-cell'],
    ],

    'navigation' => [
        'enabled' => true,
        'label' => 'Navigation',
        'group' => 'content',
        'permission_prefix' => 'content.navigation',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.menu-items.index',
        'admin_route_pattern' => 'admin.menu-items.*',
        'api_prefix' => '/api/v1/navigation',
        'roles' => ['super_admin', 'admin'],
        'service' => 'App\\Services\\NavigationService',
    ],

    'site-pages' => [
        'enabled' => true,
        'label' => 'Site Pages',
        'group' => 'content',
        'permission_prefix' => 'content.site_pages',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.site-pages.index',
        'admin_route_pattern' => 'admin.site-pages.*',
        'api_prefix' => '/api/v1/site-pages',
        'roles' => ['super_admin', 'admin'],
        'service' => null,
    ],

    /*
    |--------------------------------------------------------------------------
    | Phase 1 — admin & account modules (live)
    |--------------------------------------------------------------------------
    */

    'users' => [
        'enabled' => true,
        'label' => 'Users',
        'group' => 'admin',
        'permission_prefix' => 'admin.users',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.users.index',
        'admin_route_pattern' => 'admin.users.*',
        'api_prefix' => null,
        'roles' => ['super_admin'],
        'service' => null,
    ],

    'activity-logs' => [
        'enabled' => true,
        'label' => 'Activity Logs',
        'group' => 'admin',
        'permission_prefix' => 'admin.activity_logs',
        'permissions' => ['view'],
        'admin_route' => 'admin.activity-logs.index',
        'admin_route_pattern' => 'admin.activity-logs.*',
        'api_prefix' => null,
        'roles' => ['super_admin', 'admin'],
        'service' => 'App\\Services\\AdminActivityLogService',
    ],

    'sessions' => [
        'enabled' => true,
        'label' => 'Sessions',
        'group' => 'admin',
        'permission_prefix' => 'admin.sessions',
        'permissions' => ['view', 'manage'],
        'admin_route' => 'admin.sessions.index',
        'admin_route_pattern' => 'admin.sessions.*',
        'api_prefix' => null,
        'roles' => ['super_admin'],
        'service' => null,
    ],

    /*
    |--------------------------------------------------------------------------
    | Future Phase — stubs (enabled: false)
    | @see docs/FUTURE-PHASES.md
    |--------------------------------------------------------------------------
    */

    'alumni' => [
        'enabled' => true,
        'label' => 'Alumni',
        'group' => 'content',
        'permission_prefix' => 'alumni',
        'permissions' => ['profiles.view', 'profiles.manage', 'events.view', 'events.manage'],
        'admin_route' => 'admin.alumni-profiles.index',
        'admin_route_pattern' => 'admin.alumni-*',
        'api_prefix' => '/api/v1/alumni-profiles',
        'roles' => ['super_admin', 'admin'],
        'service' => 'App\\Services\\Alumni\\AlumniProfileService',
        'tables' => ['alumni_profiles', 'alumni_events'],
        'upload_directory' => 'alumni_photo',
    ],

    'student-portal' => [
        'enabled' => false,
        'label' => 'Student Portal',
        'group' => 'portal',
        'permission_prefix' => 'student-portal',
        'permissions' => ['students.view', 'students.manage', 'documents.view', 'documents.manage'],
        'admin_route' => 'admin.students.index',
        'admin_route_pattern' => 'admin.students.*',
        'api_prefix' => '/api/v1/student',
        'roles' => ['super_admin', 'admin'],
        'service' => 'App\\Services\\StudentPortal\\StudentService',
        'tables' => ['students', 'student_documents'],
        'upload_directory' => 'student_document',
        'auth_guard' => 'student',
    ],

    'admissions-online' => [
        'enabled' => false,
        'label' => 'Online Admissions',
        'group' => 'content',
        'permission_prefix' => 'admissions.online',
        'permissions' => ['applications.view', 'applications.review', 'applications.manage', 'cycles.manage'],
        'admin_route' => 'admin.admission-applications.index',
        'admin_route_pattern' => 'admin.admission-*',
        'api_prefix' => '/api/v1/admissions',
        'roles' => ['super_admin', 'admin'],
        'service' => 'App\\Services\\Admissions\\ApplicationService',
        'tables' => ['admission_applications', 'admission_application_documents', 'admission_cycles'],
        'upload_directories' => ['admission_document', 'admission_photo'],
        'extends_static_routes' => ['/admissions/admission-process', '/admissions/online-admission-format'],
    ],

    'placement' => [
        'enabled' => true,
        'label' => 'Placement',
        'group' => 'content',
        'permission_prefix' => 'placement-drives',
        'permissions' => ['manage'],
        'admin_route' => 'admin.placement-drives.index',
        'admin_route_pattern' => 'admin.placement-drives.*',
        'api_prefix' => '/api/v1/placement-drives',
        'roles' => ['super_admin', 'admin'],
        'service' => 'App\\Services\\PlacementDriveService',
        'tables' => ['placement_drives'],
        'upload_directories' => ['placement_drive_image'],
    ],

    'downloads' => [
        'enabled' => false,
        'label' => 'Downloads',
        'group' => 'content',
        'permission_prefix' => 'downloads',
        'permissions' => ['categories.manage', 'files.view', 'files.manage'],
        'admin_route' => 'admin.download-files.index',
        'admin_route_pattern' => 'admin.download-*',
        'api_prefix' => '/api/v1/downloads',
        'roles' => ['super_admin', 'admin', 'staff'],
        'service' => 'App\\Services\\Downloads\\DownloadFileService',
        'tables' => ['download_categories', 'download_files'],
        'upload_directory' => 'download_file',
        'replaces_or_extends' => 'documents',
        'secure_upload_type' => 'pdf',
    ],

];
