<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Models\Announcement;
use App\Services\RichHtmlSanitizer;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private RichHtmlSanitizer $richHtml)
    {
    }
    public function index(Request $request)
    {
        $announcements = AdminPagination::paginate(Announcement::query()->latest(), $request, 15);
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.announcements.index', compact('announcements', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.announcements.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string'],
            'link' => ['nullable', 'url', 'max:500'],
            'active' => ['sometimes', 'boolean'],
        ]);

        $validated['active'] = $request->boolean('active');
        $validated = $this->richHtml->cleanFields($validated, ['message']);

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Announcement created successfully.');
    }

    public function edit(Announcement $announcement)
    {
        return view('admin.announcements.edit', compact('announcement'));
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'message' => ['required', 'string'],
            'link' => ['nullable', 'url', 'max:500'],
            'active' => ['sometimes', 'boolean'],
        ]);

        $validated['active'] = $request->boolean('active');
        $validated = $this->richHtml->cleanFields($validated, ['message']);

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Announcement updated successfully.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Announcement deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            Announcement::class,
            'admin.announcements.index',
            fn (Announcement $announcement) => $announcement->delete(),
        );
    }
}
