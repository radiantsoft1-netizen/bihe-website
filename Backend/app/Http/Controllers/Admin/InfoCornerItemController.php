<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreInfoCornerItemRequest;
use App\Http\Requests\Admin\UpdateInfoCornerItemRequest;
use App\Models\InfoCornerCategory;
use App\Models\InfoCornerItem;
use App\Services\InfoCornerItemService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class InfoCornerItemController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private InfoCornerItemService $infoCornerItems)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, InfoCornerItem::count());
        $infoCornerItems = $this->infoCornerItems->paginateForIndex($perPage)->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.info-corner-items.index', compact('infoCornerItems', 'selectedPerPage'));
    }

    public function create()
    {
        $categories = $this->infoCornerItems->activeCategories();

        return view('admin.info-corner-items.create', compact('categories'));
    }

    public function store(StoreInfoCornerItemRequest $request)
    {
        $this->infoCornerItems->create($request);

        return redirect()->route('admin.info-corner-items.index')
            ->with('success', 'Info Corner item created successfully.');
    }

    public function edit(InfoCornerItem $infoCornerItem)
    {
        $infoCornerItem->load(['categories', 'images']);
        $categories = $this->infoCornerItems->activeCategories();

        return view('admin.info-corner-items.edit', compact('infoCornerItem', 'categories'));
    }

    public function update(UpdateInfoCornerItemRequest $request, InfoCornerItem $infoCornerItem)
    {
        $this->infoCornerItems->update($request, $infoCornerItem);

        return redirect()->route('admin.info-corner-items.index')
            ->with('success', 'Info Corner item updated successfully.');
    }

    public function destroy(InfoCornerItem $infoCornerItem)
    {
        $this->infoCornerItems->delete($infoCornerItem);

        return redirect()->route('admin.info-corner-items.index')
            ->with('success', 'Info Corner item deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            InfoCornerItem::class,
            'admin.info-corner-items.index',
            fn (InfoCornerItem $item) => $this->infoCornerItems->delete($item),
        );
    }
}
