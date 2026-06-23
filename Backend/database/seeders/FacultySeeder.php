<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\FacultyDepartment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/faculty-members.json');

        if (! File::exists($path)) {
            $this->command?->warn('FacultySeeder: faculty-members.json not found — skipping.');

            return;
        }

        $members = json_decode(File::get($path), true, 512, JSON_THROW_ON_ERROR);
        $departmentIds = FacultyDepartment::pluck('id', 'slug');

        foreach ($members as $member) {
            $departmentSlugs = $member['departments'] ?? [];
            unset($member['departments']);

            $faculty = Faculty::updateOrCreate(
                ['name' => $member['name']],
                [
                    'designation' => $member['designation'],
                    'qualification' => $member['qualification'] ?? null,
                    'experience' => $member['experience'] ?? null,
                    'seminar_workshop' => $member['seminar_workshop'] ?? null,
                    'subject_teaching' => $member['subject_teaching'] ?? null,
                    'photo_path' => $member['photo_path'] ?? null,
                    'resume_path' => $member['resume_path'] ?? null,
                    'resume_name' => $member['resume_name'] ?? null,
                    'sort_order' => $member['sort_order'] ?? 0,
                    'published' => $member['published'] ?? true,
                ]
            );

            $ids = collect($departmentSlugs)
                ->map(fn (string $slug) => $departmentIds[$slug] ?? null)
                ->filter()
                ->values()
                ->all();

            if ($ids !== []) {
                $faculty->facultyDepartments()->sync($ids);
            }
        }
    }
}
