<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\FacultyDepartment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FacultyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $department = $request->query('department');

        $query = Faculty::published()
            ->with('facultyDepartments:id,name,slug,sort_order')
            ->orderBy('sort_order')
            ->orderBy('id');

        if ($department) {
            $query->byDepartment($department);
        }

        $data = $query->get()->map(fn (Faculty $member) => $this->transform($member));

        return response()->json(['data' => $data]);
    }

    public function sections(): JsonResponse
    {
        $departments = FacultyDepartment::active()->ordered()->get();

        $members = Faculty::published()
            ->with('facultyDepartments:id,name,slug,sort_order')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $sections = $departments->map(function (FacultyDepartment $section) use ($members) {
            $sectionMembers = $members
                ->filter(fn (Faculty $member) => in_array($section->slug, $member->departmentSlugs(), true))
                ->map(fn (Faculty $member) => $this->transform($member))
                ->values();

            return [
                'id' => $section->slug,
                'title' => $section->name,
                'members' => $sectionMembers,
            ];
        });

        return response()->json(['data' => $sections->values()]);
    }

    public function resume(Faculty $faculty): StreamedResponse
    {
        if (! $faculty->published || ! $faculty->resume_path) {
            abort(404);
        }

        $disk = \Illuminate\Support\Facades\Storage::disk('public');
        if (! $disk->exists($faculty->resume_path)) {
            abort(404);
        }

        $filename = $faculty->resume_name ?: 'faculty-profile.pdf';

        return response()->stream(function () use ($disk, $faculty) {
            echo $disk->get($faculty->resume_path);
        }, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }

    protected function transform(Faculty $member): array
    {
        $departments = $member->departmentSlugs();

        return [
            'id' => (string) $member->id,
            'name' => $member->name,
            'photo' => $member->photo_path ? url('storage/'.$member->photo_path) : null,
            'designation' => $member->designation,
            'qualification' => $member->qualification,
            'experience' => $member->experience,
            'seminarWorkshop' => $member->seminar_workshop,
            'subjectTeaching' => $member->subject_teaching,
            'resume' => $member->resume_path ? url('/api/v1/faculty/'.$member->id.'/resume') : null,
            'resumeName' => $member->resume_name,
            'department' => $departments[0] ?? null,
            'departments' => $departments,
            'sortOrder' => $member->sort_order,
        ];
    }
}
