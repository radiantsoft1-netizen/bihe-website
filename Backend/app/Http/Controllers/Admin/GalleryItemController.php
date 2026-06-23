<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use App\Services\SecureFileUploadService;
use App\Support\AdminPagination;
use App\Support\UploadedFileRules;
use Illuminate\Http\Request;

class GalleryItemController extends Controller
{
    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function index(Request $request)
    {
        $galleryItems = AdminPagination::paginate(
            GalleryItem::query()->orderBy('sort_order')->orderBy('id'),
            $request,
            15,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.gallery.index', compact('galleryItems', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.gallery.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'filter_id' => ['nullable', 'string', 'max:100'],
            'details' => ['nullable', 'string'],
            'image' => UploadedFileRules::image(required: true),
            'published' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $upload = $this->uploads->store(
            $request->file('image'),
            'image',
            config('uploads.directories.gallery')
        );
        $validated['image_path'] = $upload->path;
        $validated['published'] = $request->boolean('published');
        unset($validated['image']);

        GalleryItem::create($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item created successfully.');
    }

    public function edit(GalleryItem $galleryItem)
    {
        return view('admin.gallery.edit', compact('galleryItem'));
    }

    public function update(Request $request, GalleryItem $galleryItem)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'filter_id' => ['nullable', 'string', 'max:100'],
            'details' => ['nullable', 'string'],
            'image' => UploadedFileRules::image(),
            'published' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        if ($request->hasFile('image')) {
            $this->uploads->delete($galleryItem->image_path);

            $upload = $this->uploads->store(
                $request->file('image'),
                'image',
                config('uploads.directories.gallery')
            );
            $validated['image_path'] = $upload->path;
        }

        $validated['published'] = $request->boolean('published');
        unset($validated['image']);

        $galleryItem->update($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item updated successfully.');
    }

    public function destroy(GalleryItem $galleryItem)
    {
        $this->uploads->delete($galleryItem->image_path);

        $galleryItem->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item deleted successfully.');
    }
}
