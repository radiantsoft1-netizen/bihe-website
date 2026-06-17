<?php

namespace App\Services;

use App\Http\Requests\Admin\StoreFacultyRequest;
use App\Http\Requests\Admin\UpdateFacultyRequest;
use App\Models\Faculty;
use App\Models\FacultyDepartment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class FacultyService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
        private RichHtmlSanitizer $richHtml,
    ) {
    }

    public function paginateForIndex(?string $departmentSlug = null, int $perPage = 15): LengthAwarePaginator
    {
        $query = Faculty::query()
            ->select([
                'id',
                'name',
                'photo_path',
                'designation',
                'published',
                'sort_order',
            ])
            ->with('facultyDepartments:id,name,slug,sort_order')
            ->orderBy('sort_order')
            ->orderBy('id');

        if ($departmentSlug !== null && $departmentSlug !== '') {
            $query->byDepartment($departmentSlug);
        }

        return $query->paginate($perPage);
    }

    public function activeDepartments(): Collection
    {
        return FacultyDepartment::active()->ordered()->get();
    }

    public function create(StoreFacultyRequest $request): Faculty
    {
        $faculty = Faculty::create($this->prepareAttributes($request));
        $this->syncDepartments($faculty, $request->validated('departments'));

        return $faculty->load('facultyDepartments');
    }

    public function update(UpdateFacultyRequest $request, Faculty $faculty): Faculty
    {
        $faculty->update($this->prepareAttributes($request, $faculty));
        $this->syncDepartments($faculty, $request->validated('departments'));

        return $faculty->load('facultyDepartments');
    }

    public function delete(Faculty $faculty): void
    {
        $this->uploads->delete($faculty->photo_path);
        $this->uploads->delete($faculty->resume_path);
        $faculty->delete();
    }

    public function updateSortOrder(Faculty $faculty, int $sortOrder): Faculty
    {
        $faculty->update(['sort_order' => $sortOrder]);

        return $faculty;
    }

    /** @param list<array{id: int, sort_order: int}> $orders */
    public function updateSortOrders(array $orders): void
    {
        foreach ($orders as $order) {
            Faculty::query()
                ->whereKey($order['id'])
                ->update(['sort_order' => $order['sort_order']]);
        }
    }

    /** @param list<string> $departmentSlugs */
    protected function syncDepartments(Faculty $faculty, array $departmentSlugs): void
    {
        $departmentIds = FacultyDepartment::query()
            ->whereIn('slug', $departmentSlugs)
            ->ordered()
            ->pluck('id')
            ->all();

        $faculty->facultyDepartments()->sync($departmentIds);
    }

    protected function prepareAttributes(
        StoreFacultyRequest|UpdateFacultyRequest $request,
        ?Faculty $existing = null
    ): array {
        $validated = $request->validated();

        unset(
            $validated['departments'],
            $validated['photo'],
            $validated['resume'],
            $validated['photo_library_path'],
            $validated['resume_library_path'],
        );

        $validated['published'] = $request->boolean('published', $existing === null);
        $validated = $this->richHtml->cleanFields($validated, ['seminar_workshop', 'subject_teaching']);

        if ($request->hasFile('photo')) {
            if ($existing?->photo_path) {
                $this->uploads->delete($existing->photo_path);
            }

            $upload = $this->uploads->store(
                $request->file('photo'),
                'image',
                config('uploads.directories.faculty_photo')
            );
            $validated['photo_path'] = $upload->path;
        } elseif ($request->filled('photo_library_path')) {
            $libraryPath = (string) $request->input('photo_library_path');

            if ($this->mediaLibrary->validatePath($libraryPath, 'image')) {
                if ($existing?->photo_path && $existing->photo_path !== $libraryPath) {
                    $this->uploads->delete($existing->photo_path);
                }

                $validated['photo_path'] = $libraryPath;
            }
        }

        if ($request->hasFile('resume')) {
            if ($existing?->resume_path) {
                $this->uploads->delete($existing->resume_path);
            }

            $upload = $this->uploads->store(
                $request->file('resume'),
                'pdf',
                config('uploads.directories.faculty_resume')
            );
            $validated['resume_path'] = $upload->path;
            $validated['resume_name'] = $upload->sanitizedOriginalName;
        } elseif ($request->filled('resume_library_path')) {
            $libraryPath = (string) $request->input('resume_library_path');

            if ($this->mediaLibrary->validatePath($libraryPath, 'pdf')) {
                if ($existing?->resume_path && $existing->resume_path !== $libraryPath) {
                    $this->uploads->delete($existing->resume_path);
                }

                $validated['resume_path'] = $libraryPath;
                $validated['resume_name'] = basename($libraryPath);
            }
        }

        return $validated;
    }
}
