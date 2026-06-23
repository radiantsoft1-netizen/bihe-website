<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreGalleryAlbumRequest;
use App\Http\Requests\Admin\UpdateGalleryAlbumRequest;
use App\Models\GalleryAlbum;
use App\Models\GalleryMedia;
use App\Services\GalleryAlbumService;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class GalleryAlbumController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(private GalleryAlbumService $galleryAlbums)
    {
    }

    public function index(Request $request)
    {
        $perPage = AdminPagination::perPageForRequest($request, 15, GalleryAlbum::count());
        $albums = $this->galleryAlbums->paginateForIndex($perPage)->withQueryString();
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.gallery.index', compact('albums', 'selectedPerPage'));
    }

    public function create()
    {
        $categories = $this->galleryAlbums->activeCategories();

        return view('admin.gallery.create', compact('categories'));
    }

    public function store(StoreGalleryAlbumRequest $request)
    {
        $album = $this->galleryAlbums->create($request);

        return redirect()->route('admin.gallery.edit', $album)
            ->with('success', 'Album created. Add more photos or videos below.');
    }

    public function edit(GalleryAlbum $galleryAlbum)
    {
        $galleryAlbum->load(['media', 'category']);
        $categories = $this->galleryAlbums->activeCategories();

        return view('admin.gallery.edit', [
            'galleryAlbum' => $galleryAlbum,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateGalleryAlbumRequest $request, GalleryAlbum $galleryAlbum)
    {
        $this->galleryAlbums->update($request, $galleryAlbum);

        return redirect()->route('admin.gallery.edit', $galleryAlbum)
            ->with('success', 'Album updated successfully.');
    }

    public function destroy(GalleryAlbum $galleryAlbum)
    {
        $this->galleryAlbums->delete($galleryAlbum);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Album deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            GalleryAlbum::class,
            'admin.gallery.index',
            fn (GalleryAlbum $galleryAlbum) => $this->galleryAlbums->delete($galleryAlbum),
        );
    }

    public function destroyMedia(GalleryAlbum $galleryAlbum, GalleryMedia $galleryMedia)
    {
        $this->galleryAlbums->deleteMedia($galleryAlbum, $galleryMedia);

        return redirect()->route('admin.gallery.edit', $galleryAlbum)
            ->with('success', 'Media item removed.');
    }
}
