<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StorePlacementDriveRequest;
use App\Http\Requests\Admin\UpdatePlacementDriveRequest;
use App\Models\PlacementDrive;
use App\Services\PlacementDriveService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class PlacementDriveController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private PlacementDriveService $placementDrives)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, PlacementDrive::count());
        $placementDrives = $this->placementDrives->paginateForIndex($perPage)->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.placement-drives.index', compact('placementDrives', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.placement-drives.create');
    }

    public function store(StorePlacementDriveRequest $request)
    {
        $this->placementDrives->create($request);

        return redirect()->route('admin.placement-drives.index')
            ->with('success', 'Placement drive created successfully.');
    }

    public function edit(PlacementDrive $placementDrive)
    {
        return view('admin.placement-drives.edit', compact('placementDrive'));
    }

    public function update(UpdatePlacementDriveRequest $request, PlacementDrive $placementDrive)
    {
        $this->placementDrives->update($request, $placementDrive);

        return redirect()->route('admin.placement-drives.index')
            ->with('success', 'Placement drive updated successfully.');
    }

    public function destroy(PlacementDrive $placementDrive)
    {
        $this->placementDrives->delete($placementDrive);

        return redirect()->route('admin.placement-drives.index')
            ->with('success', 'Placement drive deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            PlacementDrive::class,
            'admin.placement-drives.index',
            fn (PlacementDrive $placementDrive) => $this->placementDrives->delete($placementDrive),
        );
    }
}
