<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreHeroBannerRequest;
use App\Http\Requests\Admin\UpdateHeroBannerRequest;
use App\Models\HeroBanner;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use App\Support\MediaUploadResolver;
use App\Services\RichHtmlSanitizer;
use App\Services\SecureFileUploadService;

class HeroBannerController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(
        private SecureFileUploadService $uploads,
        private RichHtmlSanitizer $richHtml,
        private MediaUploadResolver $mediaUploads,
    ) {
    }

    public function index(Request $request)
    {
        $heroBanners = AdminPagination::paginate(
            HeroBanner::query()->orderBy('sort_order')->orderBy('id'),
            $request,
            15,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.hero-banners.index', compact('heroBanners', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.hero-banners.create');
    }

    public function store(StoreHeroBannerRequest $request)
    {
        $validated = $request->validated();
        $validated['active'] = $request->boolean('active');
        $validated = $this->richHtml->cleanFields($validated, ['subtitle']);
        unset($validated['image'], $validated['image_library_path']);

        $imagePath = $this->mediaUploads->resolveImage(
            $request,
            'image',
            'image_library_path',
            null,
            config('uploads.directories.hero_banner'),
        );

        if ($imagePath) {
            $validated['image_path'] = $imagePath;
        }

        HeroBanner::create($validated);

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Hero banner created successfully.');
    }

    public function edit(HeroBanner $heroBanner)
    {
        return view('admin.hero-banners.edit', compact('heroBanner'));
    }

    public function update(UpdateHeroBannerRequest $request, HeroBanner $heroBanner)
    {
        $validated = $request->validated();
        $validated['active'] = $request->boolean('active');
        $validated = $this->richHtml->cleanFields($validated, ['subtitle']);
        unset($validated['image'], $validated['image_library_path']);

        $imagePath = $this->mediaUploads->resolveImage(
            $request,
            'image',
            'image_library_path',
            $heroBanner->image_path,
            config('uploads.directories.hero_banner'),
        );

        if ($imagePath) {
            $validated['image_path'] = $imagePath;
        }

        $heroBanner->update($validated);

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Hero banner updated successfully.');
    }

    public function destroy(HeroBanner $heroBanner)
    {
        $this->uploads->delete($heroBanner->image_path);
        $heroBanner->delete();

        return redirect()->route('admin.hero-banners.index')
            ->with('success', 'Hero banner deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            HeroBanner::class,
            'admin.hero-banners.index',
            function (HeroBanner $heroBanner): void {
                $this->uploads->delete($heroBanner->image_path);
                $heroBanner->delete();
            },
        );
    }
}
