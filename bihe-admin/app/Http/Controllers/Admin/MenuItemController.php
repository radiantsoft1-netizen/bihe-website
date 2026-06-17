<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreMenuItemRequest;
use App\Http\Requests\Admin\UpdateMenuItemRequest;
use App\Models\MenuItem;
use App\Services\RichHtmlSanitizer;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private RichHtmlSanitizer $richHtml)
    {
    }
    public function index(Request $request)
    {
        $menuKey = $request->query('menu', 'header');
        $menuItems = AdminPagination::paginate(
            MenuItem::query()
                ->forMenu($menuKey)
                ->whereNull('parent_id')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->with(['children' => fn ($query) => $query->orderBy('sort_order')->orderBy('id')]),
            $request,
            20,
        );

        $parents = MenuItem::query()
            ->forMenu($menuKey)
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->orderBy('label')
            ->get(['id', 'label']);

        $selectedPerPage = AdminPagination::selectedPerPage($request, 20);

        return view('admin.menu-items.index', compact('menuItems', 'menuKey', 'parents', 'selectedPerPage'));
    }

    public function create(Request $request)
    {
        $menuKey = $request->query('menu', 'header');
        $parents = MenuItem::query()
            ->forMenu($menuKey)
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->orderBy('label')
            ->get();

        return view('admin.menu-items.create', compact('menuKey', 'parents'));
    }

    public function store(StoreMenuItemRequest $request)
    {
        $validated = $request->validated();
        $validated['is_visible'] = $request->boolean('is_visible');
        $validated['open_in_new_tab'] = $request->boolean('open_in_new_tab');
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        MenuItem::create($validated);

        return redirect()
            ->route('admin.menu-items.index', ['menu' => $validated['menu_key']])
            ->with('success', 'Menu item created successfully.');
    }

    public function edit(MenuItem $menuItem)
    {
        $menuKey = $menuItem->menu_key;
        $parents = MenuItem::query()
            ->forMenu($menuKey)
            ->whereNull('parent_id')
            ->where('id', '!=', $menuItem->id)
            ->orderBy('sort_order')
            ->orderBy('label')
            ->get();

        return view('admin.menu-items.edit', compact('menuItem', 'menuKey', 'parents'));
    }

    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem)
    {
        $validated = $request->validated();
        $validated['is_visible'] = $request->boolean('is_visible');
        $validated['open_in_new_tab'] = $request->boolean('open_in_new_tab');
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        $menuItem->update($validated);

        return redirect()
            ->route('admin.menu-items.index', ['menu' => $menuItem->menu_key])
            ->with('success', 'Menu item updated successfully.');
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuKey = $menuItem->menu_key;
        $menuItem->children()->delete();
        $menuItem->delete();

        return redirect()
            ->route('admin.menu-items.index', ['menu' => $menuKey])
            ->with('success', 'Menu item deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        $menuKey = $request->query('menu', 'header');

        return $this->bulkDestroyRecords(
            $request,
            MenuItem::class,
            'admin.menu-items.index',
            function (MenuItem $menuItem): void {
                $menuItem->children()->delete();
                $menuItem->delete();
            },
            redirectRouteParameters: ['menu' => $menuKey],
        );
    }
}
