<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class,
            AdminUserSeeder::class,
            FacultyDepartmentSeeder::class,
            ContentSeeder::class,
            FacultySeeder::class,
            InfoCornerSeeder::class,
            SiteNavigationSeeder::class,
            SitePagesSeeder::class,
            PlacementDriveSeeder::class,
            AlumniSeeder::class,
            SportsGallerySeeder::class,
            DropboxGallerySeeder::class,
            ProspectusSettingSeeder::class,
        ]);
    }
}
