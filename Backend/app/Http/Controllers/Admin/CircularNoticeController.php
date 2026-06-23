<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreCircularNoticeRequest;
use App\Http\Requests\Admin\UpdateCircularNoticeRequest;
use App\Models\CircularNotice;
use App\Services\CircularNoticeService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class CircularNoticeController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private CircularNoticeService $circularNotices)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, CircularNotice::count());
        $circularNotices = $this->circularNotices->paginateForIndex($perPage)->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.circular-notices.index', compact('circularNotices', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.circular-notices.create');
    }

    public function store(StoreCircularNoticeRequest $request)
    {
        $this->circularNotices->create($request);

        return redirect()->route('admin.circular-notices.index')
            ->with('success', 'Circular notice created successfully.');
    }

    public function edit(CircularNotice $circularNotice)
    {
        return view('admin.circular-notices.edit', compact('circularNotice'));
    }

    public function update(UpdateCircularNoticeRequest $request, CircularNotice $circularNotice)
    {
        $this->circularNotices->update($request, $circularNotice);

        return redirect()->route('admin.circular-notices.index')
            ->with('success', 'Circular notice updated successfully.');
    }

    public function destroy(CircularNotice $circularNotice)
    {
        $this->circularNotices->delete($circularNotice);

        return redirect()->route('admin.circular-notices.index')
            ->with('success', 'Circular notice deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            CircularNotice::class,
            'admin.circular-notices.index',
            fn (CircularNotice $circularNotice) => $this->circularNotices->delete($circularNotice),
        );
    }
}
