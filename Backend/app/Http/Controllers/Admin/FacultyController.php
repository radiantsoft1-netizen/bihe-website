<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreFacultyRequest;
use App\Http\Requests\Admin\UpdateFacultyRequest;
use App\Models\Faculty;
use App\Support\AdminPagination;
use App\Services\FacultyService;
use App\Services\WebsiteRevalidationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private FacultyService $facultyService)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, Faculty::count());
        $faculty = $this->facultyService->paginateForIndex($request->query('department'), $perPage)->withQueryString();
        $departments = $this->facultyService->activeDepartments();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.faculty.index', compact('faculty', 'departments', 'selectedPerPage'));
    }

    public function create()
    {
        $departments = $this->facultyService->activeDepartments();

        return view('admin.faculty.create', compact('departments'));
    }

    public function store(StoreFacultyRequest $request)
    {
        $this->facultyService->create($request);

        return redirect()->route('admin.faculty.index')
            ->with('success', 'Faculty / staff member created successfully.');
    }

    public function edit(Faculty $faculty)
    {
        $faculty->load('facultyDepartments');
        $departments = $this->facultyService->activeDepartments();

        return view('admin.faculty.edit', compact('faculty', 'departments'));
    }

    public function update(UpdateFacultyRequest $request, Faculty $faculty)
    {
        $this->facultyService->update($request, $faculty);

        return redirect()->route('admin.faculty.index')
            ->with('success', 'Faculty / staff member updated successfully.');
    }

    public function destroy(Faculty $faculty)
    {
        $this->facultyService->delete($faculty);

        return redirect()->route('admin.faculty.index')
            ->with('success', 'Faculty / staff member deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            Faculty::class,
            'admin.faculty.index',
            fn (Faculty $faculty) => $this->facultyService->delete($faculty),
        );
    }

    public function updateSortOrders(
        Request $request,
        WebsiteRevalidationService $websiteRevalidation
    ): JsonResponse {
        $validated = $request->validate([
            'orders' => ['required', 'array', 'min:1'],
            'orders.*.id' => ['required', 'integer', 'exists:faculty,id'],
            'orders.*.sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $this->facultyService->updateSortOrders($validated['orders']);
        $websiteRevalidation->revalidateForResource('faculty');

        return response()->json([
            'message' => 'Display order updated for all selected members.',
            'orders' => $validated['orders'],
        ]);
    }

    public function updateSortOrder(
        Request $request,
        Faculty $faculty,
        WebsiteRevalidationService $websiteRevalidation
    ): JsonResponse {
        $validated = $request->validate([
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $this->facultyService->updateSortOrder($faculty, $validated['sort_order']);
        $websiteRevalidation->revalidateForResource('faculty');

        return response()->json([
            'message' => 'Display order updated.',
            'sort_order' => $faculty->sort_order,
        ]);
    }
}
