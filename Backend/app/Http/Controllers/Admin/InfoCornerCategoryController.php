<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InfoCornerCategory;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class InfoCornerCategoryController extends Controller
{
    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, InfoCornerCategory::count());
        $categories = InfoCornerCategory::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.info-corner-categories.index', compact('categories', 'selectedPerPage'));
    }

    public function create(Request $request)
    {
        return view('admin.info-corner-categories.create', [
            'returnUrl' => $this->safeReturnUrl($request->query('return')),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('info_corner_categories', 'slug'),
            ],
            'published' => ['sometimes', 'boolean'],
            'return_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $category = InfoCornerCategory::create([
            'name' => $validated['name'],
            'slug' => $this->resolveSlug($validated['slug'] ?? null, $validated['name']),
            'published' => $request->boolean('published', true),
        ]);

        $returnUrl = $this->safeReturnUrl($validated['return_url'] ?? null);

        if ($returnUrl) {
            return redirect($returnUrl)
                ->with('success', 'Category "'.$category->name.'" created. Select it from the list.');
        }

        return redirect()->route('admin.info-corner-categories.index')
            ->with('success', 'Category created successfully.');
    }

    protected function resolveSlug(?string $slug, string $name): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        while (InfoCornerCategory::where('slug', $candidate)->exists()) {
            $candidate = $base.'-'.$suffix;
            $suffix++;
        }

        return $candidate;
    }

    protected function safeReturnUrl(?string $url): ?string
    {
        if (! is_string($url) || $url === '') {
            return null;
        }

        $adminRoot = url('/admin');

        if (! Str::startsWith($url, $adminRoot)) {
            return null;
        }

        return $url;
    }
}
