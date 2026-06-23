<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Models\GalleryCategory;
use App\Services\RichHtmlSanitizer;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class GalleryCategoryController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private RichHtmlSanitizer $richHtml)
    {
    }
    public function index(Request $request)
    {
        $categories = AdminPagination::paginate(
            GalleryCategory::query()->withCount('albums')->orderBy('sort_order')->orderBy('name'),
            $request,
            20,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 20);

        return view('admin.gallery-categories.index', compact('categories', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.gallery-categories.create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateCategory($request);
        $validated['slug'] = $this->resolveSlug($validated['slug'] ?? null, $validated['name']);
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        GalleryCategory::create($validated);

        return redirect()->route('admin.gallery-categories.index')
            ->with('success', 'Gallery category created successfully.');
    }

    public function edit(GalleryCategory $galleryCategory)
    {
        return view('admin.gallery-categories.edit', compact('galleryCategory'));
    }

    public function update(Request $request, GalleryCategory $galleryCategory)
    {
        $validated = $this->validateCategory($request, $galleryCategory);
        $validated['slug'] = $this->resolveSlug($validated['slug'] ?? null, $validated['name'], $galleryCategory->id);
        $validated['is_active'] = $request->boolean('is_active');
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        $galleryCategory->update($validated);

        return redirect()->route('admin.gallery-categories.index')
            ->with('success', 'Gallery category updated successfully.');
    }

    public function destroy(GalleryCategory $galleryCategory)
    {
        if ($galleryCategory->albums()->exists()) {
            return redirect()->route('admin.gallery-categories.index')
                ->with('error', 'Cannot delete a category that still has albums.');
        }

        $galleryCategory->delete();

        return redirect()->route('admin.gallery-categories.index')
            ->with('success', 'Gallery category deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            GalleryCategory::class,
            'admin.gallery-categories.index',
            fn (GalleryCategory $galleryCategory) => $galleryCategory->delete(),
            fn (GalleryCategory $galleryCategory) => ! $galleryCategory->albums()->exists(),
        );
    }

    protected function validateCategory(Request $request, ?GalleryCategory $category = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'slug' => [
                'nullable',
                'string',
                'max:100',
                Rule::unique('gallery_categories', 'slug')->ignore($category?->id),
            ],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }

    protected function resolveSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        while (
            GalleryCategory::where('slug', $candidate)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $base.'-'.$suffix;
            $suffix++;
        }

        return $candidate;
    }
}
