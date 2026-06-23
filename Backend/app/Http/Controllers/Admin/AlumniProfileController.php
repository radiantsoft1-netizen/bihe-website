<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreAlumniProfileRequest;
use App\Http\Requests\Admin\UpdateAlumniProfileRequest;
use App\Models\AlumniProfile;
use App\Services\Alumni\AlumniProfileService;
use App\Services\WebsiteRevalidationService;
use App\Support\AdminPagination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlumniProfileController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private AlumniProfileService $profiles)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, AlumniProfile::count());
        $profiles = $this->profiles->paginateForIndex(
            $request->query('status'),
            $request->query('program'),
            $request->query('q'),
            $perPage,
        )->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.alumni-profiles.index', compact('profiles', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.alumni-profiles.create');
    }

    public function store(StoreAlumniProfileRequest $request, WebsiteRevalidationService $websiteRevalidation)
    {
        $this->profiles->create($request);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return redirect()->route('admin.alumni-profiles.index')
            ->with('success', 'Alumni profile created successfully.');
    }

    public function edit(AlumniProfile $alumniProfile)
    {
        return view('admin.alumni-profiles.edit', ['profile' => $alumniProfile]);
    }

    public function update(
        UpdateAlumniProfileRequest $request,
        AlumniProfile $alumniProfile,
        WebsiteRevalidationService $websiteRevalidation,
    ) {
        $this->profiles->update($request, $alumniProfile);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return redirect()->route('admin.alumni-profiles.index')
            ->with('success', 'Alumni profile updated successfully.');
    }

    public function destroy(AlumniProfile $alumniProfile, WebsiteRevalidationService $websiteRevalidation)
    {
        $this->profiles->delete($alumniProfile);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return redirect()->route('admin.alumni-profiles.index')
            ->with('success', 'Alumni profile deleted successfully.');
    }

    public function approve(AlumniProfile $alumniProfile, WebsiteRevalidationService $websiteRevalidation)
    {
        $this->profiles->approve($alumniProfile);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return redirect()->route('admin.alumni-profiles.edit', $alumniProfile)
            ->with('success', 'Alumni profile approved and published.');
    }

    public function reject(Request $request, AlumniProfile $alumniProfile, WebsiteRevalidationService $websiteRevalidation)
    {
        $validated = $request->validate([
            'rejection_note' => ['nullable', 'string', 'max:1000'],
        ]);

        $this->profiles->reject($alumniProfile, $validated['rejection_note'] ?? null);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return redirect()->route('admin.alumni-profiles.edit', $alumniProfile)
            ->with('success', 'Alumni profile rejected.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            AlumniProfile::class,
            'admin.alumni-profiles.index',
            fn (AlumniProfile $profile) => $this->profiles->delete($profile),
        );
    }

    public function updateSortOrders(
        Request $request,
        WebsiteRevalidationService $websiteRevalidation,
    ): JsonResponse {
        $validated = $request->validate([
            'orders' => ['required', 'array', 'min:1'],
            'orders.*.id' => ['required', 'integer', 'exists:alumni_profiles,id'],
            'orders.*.sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $this->profiles->updateSortOrders($validated['orders']);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return response()->json([
            'message' => 'Display order updated for all selected alumni.',
            'orders' => $validated['orders'],
        ]);
    }

    public function updateSortOrder(
        Request $request,
        AlumniProfile $alumniProfile,
        WebsiteRevalidationService $websiteRevalidation,
    ): JsonResponse {
        $validated = $request->validate([
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $this->profiles->updateSortOrder($alumniProfile, $validated['sort_order']);
        $websiteRevalidation->revalidateForResource('alumni-profiles');

        return response()->json([
            'message' => 'Display order updated.',
            'sort_order' => $alumniProfile->sort_order,
        ]);
    }
}
