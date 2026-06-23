<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreNewsEventRequest;
use App\Http\Requests\Admin\UpdateNewsEventRequest;
use App\Models\NewsEvent;
use App\Services\NewsEventService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class NewsEventController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private NewsEventService $newsEvents)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, NewsEvent::count());
        $newsEvents = $this->newsEvents->paginateForIndex($perPage)->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.news-events.index', compact('newsEvents', 'selectedPerPage'));
    }

    public function create()
    {
        $categories = $this->newsEvents->activeCategories();

        return view('admin.news-events.create', compact('categories'));
    }

    public function store(StoreNewsEventRequest $request)
    {
        $this->newsEvents->create($request);

        return redirect()->route('admin.news-events.index')
            ->with('success', 'News item created successfully.');
    }

    public function edit(NewsEvent $newsEvent)
    {
        $categories = $this->newsEvents->activeCategories();

        return view('admin.news-events.edit', compact('newsEvent', 'categories'));
    }

    public function update(UpdateNewsEventRequest $request, NewsEvent $newsEvent)
    {
        $this->newsEvents->update($request, $newsEvent);

        return redirect()->route('admin.news-events.index')
            ->with('success', 'News item updated successfully.');
    }

    public function destroy(NewsEvent $newsEvent)
    {
        $this->newsEvents->delete($newsEvent);

        return redirect()->route('admin.news-events.index')
            ->with('success', 'News item deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            NewsEvent::class,
            'admin.news-events.index',
            fn (NewsEvent $newsEvent) => $this->newsEvents->delete($newsEvent),
        );
    }
}
