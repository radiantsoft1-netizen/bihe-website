<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreAlumniEventRequest;
use App\Http\Requests\Admin\UpdateAlumniEventRequest;
use App\Models\AlumniEvent;
use App\Services\Alumni\AlumniEventService;
use App\Services\WebsiteRevalidationService;
use App\Support\AdminPagination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlumniEventController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private AlumniEventService $events)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, AlumniEvent::count());
        $events = $this->events->paginateForIndex($perPage)->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.alumni-events.index', compact('events', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.alumni-events.create');
    }

    public function store(StoreAlumniEventRequest $request)
    {
        $this->events->create($request);

        return redirect()->route('admin.alumni-events.index')
            ->with('success', 'Alumni event created successfully.');
    }

    public function edit(AlumniEvent $alumniEvent)
    {
        return view('admin.alumni-events.edit', ['event' => $alumniEvent]);
    }

    public function update(UpdateAlumniEventRequest $request, AlumniEvent $alumniEvent)
    {
        $this->events->update($request, $alumniEvent);

        return redirect()->route('admin.alumni-events.index')
            ->with('success', 'Alumni event updated successfully.');
    }

    public function destroy(AlumniEvent $alumniEvent)
    {
        $this->events->delete($alumniEvent);

        return redirect()->route('admin.alumni-events.index')
            ->with('success', 'Alumni event deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            AlumniEvent::class,
            'admin.alumni-events.index',
            fn (AlumniEvent $event) => $this->events->delete($event),
        );
    }

    public function updateSortOrders(
        Request $request,
        WebsiteRevalidationService $websiteRevalidation,
    ): JsonResponse {
        $validated = $request->validate([
            'orders' => ['required', 'array', 'min:1'],
            'orders.*.id' => ['required', 'integer', 'exists:alumni_events,id'],
            'orders.*.sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $this->events->updateSortOrders($validated['orders']);
        $websiteRevalidation->revalidateForResource('alumni-events');

        return response()->json([
            'message' => 'Display order updated for all selected events.',
            'orders' => $validated['orders'],
        ]);
    }

    public function updateSortOrder(
        Request $request,
        AlumniEvent $alumniEvent,
        WebsiteRevalidationService $websiteRevalidation,
    ): JsonResponse {
        $validated = $request->validate([
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $this->events->updateSortOrder($alumniEvent, $validated['sort_order']);
        $websiteRevalidation->revalidateForResource('alumni-events');

        return response()->json([
            'message' => 'Display order updated.',
            'sort_order' => $alumniEvent->sort_order,
        ]);
    }
}
