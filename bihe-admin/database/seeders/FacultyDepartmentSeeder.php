<?php

namespace Database\Seeders;

use App\Models\FacultyDepartment;
use Illuminate\Database\Seeder;

class FacultyDepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            [
                'name' => 'B.Com Faculty',
                'slug' => 'b-com',
                'description' => 'Commerce faculty and department leadership.',
                'sort_order' => 0,
            ],
            [
                'name' => 'BCA Faculty',
                'slug' => 'bca',
                'description' => 'Computer applications faculty and technical mentors.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Non Teaching Staff',
                'slug' => 'non-teaching-staff',
                'description' => 'Administrative and support staff.',
                'sort_order' => 2,
            ],
        ];

        foreach ($departments as $department) {
            FacultyDepartment::updateOrCreate(
                ['slug' => $department['slug']],
                array_merge($department, ['is_active' => true])
            );
        }
    }
}
