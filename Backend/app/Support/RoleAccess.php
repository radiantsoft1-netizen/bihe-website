<?php

namespace App\Support;

use App\Models\User;

class RoleAccess
{
    /** @return list<string> */
    public static function accessibleModules(User $user): array
    {
        $modules = [];

        foreach (AdminPermissions::moduleMap() as $module => $config) {
            if ($module === 'dashboard') {
                continue;
            }

            if ($user->can($config['permission'])) {
                $modules[] = $module;
            }
        }

        return $modules;
    }

    public static function canAccessModule(User $user, string $module): bool
    {
        $config = AdminPermissions::moduleMap()[$module] ?? null;

        if ($config === null) {
            return false;
        }

        return $user->can($config['permission']);
    }

    /** @return list<array{module: string, label: string, route: string, pattern: string|list<string>, children?: list<array{label: string, route: string, pattern: string|list<string>}>}> */
    public static function navigationItems(User $user): array
    {
        $settingsSlugs = AdminPermissions::settingsModuleSlugs();
        $items = [];
        $settingsItem = self::settingsNavigationItem($user);

        foreach (AdminPermissions::moduleMap() as $module => $config) {
            if (in_array($module, $settingsSlugs, true)) {
                continue;
            }

            if (! $user->can($config['permission'])) {
                continue;
            }

            $item = [
                'module' => $module,
                'label' => $config['label'],
                'route' => $config['route'],
                'pattern' => $config['pattern'],
            ];

            if (! empty($config['children'])) {
                $item['children'] = $config['children'];
            }

            $items[] = $item;
        }

        return self::insertSettingsAfterGallery($items, $settingsItem);
    }

    /** @return array{module: string, label: string, route: string, pattern: string|list<string>, children: list<array{label: string, route: string, pattern: string|list<string>}>}|null */
    protected static function settingsNavigationItem(User $user): ?array
    {
        $settingsChildren = self::settingsChildren($user);

        if ($settingsChildren === []) {
            return null;
        }

        return [
            'module' => 'settings',
            'label' => 'Settings',
            'route' => $settingsChildren[0]['route'],
            'pattern' => self::settingsPatterns($settingsChildren),
            'children' => $settingsChildren,
        ];
    }

    /**
     * @param  list<array{module: string, label: string, route: string, pattern: string|list<string>, children?: list<array{label: string, route: string, pattern: string|list<string>}>}>  $items
     * @param  array{module: string, label: string, route: string, pattern: string|list<string>, children: list<array{label: string, route: string, pattern: string|list<string>}>}|null  $settingsItem
     * @return list<array{module: string, label: string, route: string, pattern: string|list<string>, children?: list<array{label: string, route: string, pattern: string|list<string>}>}>
     */
    protected static function insertSettingsAfterGallery(array $items, ?array $settingsItem): array
    {
        if ($settingsItem === null) {
            return $items;
        }

        foreach ($items as $index => $item) {
            if ($item['module'] === 'gallery') {
                array_splice($items, $index + 1, 0, [$settingsItem]);

                return $items;
            }
        }

        foreach ($items as $index => $item) {
            if ($item['module'] === 'documents') {
                array_splice($items, $index + 1, 0, [$settingsItem]);

                return $items;
            }
        }

        $items[] = $settingsItem;

        return $items;
    }

    /** @return list<array{label: string, route: string, pattern: string|list<string>}> */
    public static function settingsChildren(User $user): array
    {
        $children = [];

        foreach (AdminPermissions::settingsModuleSlugs() as $module) {
            $config = AdminPermissions::moduleMap()[$module] ?? null;

            if ($config === null || ! $user->can($config['permission'])) {
                continue;
            }

            $children[] = [
                'label' => $config['label'],
                'route' => $config['route'],
                'pattern' => $config['pattern'],
            ];
        }

        foreach (self::accountModules() as $item) {
            $children[] = [
                'label' => $item['label'],
                'route' => $item['route'],
                'pattern' => $item['pattern'],
            ];
        }

        return $children;
    }

    /**
     * @param  list<array{label: string, route: string, pattern: string|list<string>}>  $children
     * @return list<string>
     */
    protected static function settingsPatterns(array $children): array
    {
        $patterns = [];

        foreach ($children as $child) {
            $childPatterns = is_array($child['pattern']) ? $child['pattern'] : [$child['pattern']];

            foreach ($childPatterns as $pattern) {
                $patterns[] = $pattern;
            }
        }

        return $patterns;
    }

    /** @return list<array{module: string, label: string, route: string, pattern: string|list<string>}> */
    public static function accountModules(): array
    {
        return [
            [
                'module' => 'profile',
                'label' => 'My Profile',
                'route' => 'admin.profile.edit',
                'pattern' => 'admin.profile.*',
            ],
            [
                'module' => 'change-password',
                'label' => 'Change Password',
                'route' => 'admin.change-password.edit',
                'pattern' => 'admin.change-password.*',
            ],
        ];
    }

    /** @return list<array{label: string, route: string, module: string}> */
    public static function quickLinks(User $user): array
    {
        $links = [
            'announcements' => ['label' => 'New Announcement', 'route' => 'admin.announcements.create', 'module' => 'announcements'],
            'hero-banners' => ['label' => 'New Hero Banner', 'route' => 'admin.hero-banners.create', 'module' => 'hero-banners'],
            'recruiting-partners' => ['label' => 'New Partner', 'route' => 'admin.recruiting-partners.create', 'module' => 'recruiting-partners'],
            'faculty' => ['label' => 'New Faculty', 'route' => 'admin.faculty.create', 'module' => 'faculty'],
            'documents' => ['label' => 'Upload Document', 'route' => 'admin.documents.create', 'module' => 'documents'],
            'gallery' => ['label' => 'Add Gallery Image', 'route' => 'admin.gallery.create', 'module' => 'gallery'],
            'users' => ['label' => 'Manage Users', 'route' => 'admin.users.index', 'module' => 'users'],
            'activity-logs' => ['label' => 'View Activity Logs', 'route' => 'admin.activity-logs.index', 'module' => 'activity-logs'],
            'sessions' => ['label' => 'Manage Sessions', 'route' => 'admin.sessions.index', 'module' => 'sessions'],
        ];

        $result = [];

        foreach (self::accessibleModules($user) as $module) {
            if (isset($links[$module])) {
                $result[] = $links[$module];
            }
        }

        return $result;
    }
}
