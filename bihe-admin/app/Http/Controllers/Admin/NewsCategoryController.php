<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Models\NewsCategory;
use App\Services\RichHtmlSanitizer;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class NewsCategoryController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private RichHtmlSanitizer $richHtml)
    {
    }
    public function index(Request $request)
    {
        $categories = AdminPagination::paginate(
            NewsCategory::query()->withCount('newsEvents')->orderBy('sort_order')->orderBy('name'),
            $request,
            20,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 20);

        return view('admin.news-categories.index', compact('categories', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.news-categories.create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateCategory($request);
        $validated['slug'] = $this->resolveSlug($validated['slug'] ?? null, $validated['name']);
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        NewsCategory::create($validated);

        return redirect()->route('admin.news-categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(NewsCategory $newsCategory)
    {
        return view('admin.news-categories.edit', compact('newsCategory'));
    }

    public function update(Request $request, NewsCategory $newsCategory)
    {
        $validated = $this->validateCategory($request, $newsCategory);
        $validated['slug'] = $this->resolveSlug($validated['slug'] ?? null, $validated['name'], $newsCategory->id);
        $validated['is_active'] = $request->boolean('is_active');
        $validated = $this->richHtml->cleanFields($validated, ['description']);

        $newsCategory->update($validated);

        return redirect()->route('admin.news-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(NewsCategory $newsCategory)
    {
        if ($newsCategory->newsEvents()->exists()) {
            return redirect()->route('admin.news-categories.index')
                ->with('error', 'Cannot delete a category that still has news items.');
        }

        $newsCategory->delete();

        return redirect()->route('admin.news-categories.index')
            ->with('success', 'Category deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            NewsCategory::class,
            'admin.news-categories.index',
            fn (NewsCategory $newsCategory) => $newsCategory->delete(),
            fn (NewsCategory $newsCategory) => ! $newsCategory->newsEvents()->exists(),
        );
    }

    protected function validateCategory(Request $request, ?NewsCategory $category = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'slug' => [
                'nullable',
                'string',
                'max:100',
                Rule::unique('news_categories', 'slug')->ignore($category?->id),
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
            NewsCategory::where('slug', $candidate)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $base.'-'.$suffix;
            $suffix++;
        }

        return $candidate;
    }
}
