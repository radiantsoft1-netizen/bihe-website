<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreGoverningBodyRequest;
use App\Http\Requests\Admin\UpdateGoverningBodyRequest;
use App\Models\GoverningBody;
use App\Services\RichHtmlSanitizer;
use App\Services\SecureFileUploadService;
use App\Support\MediaUploadResolver;
use App\Support\AdminPagination;
use App\Support\UniqueSlug;
use Illuminate\Http\Request;

class GoverningBodyController extends Controller
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
        $governingBodies = AdminPagination::paginate(
            GoverningBody::query()->orderBy('sort_order')->orderBy('id'),
            $request,
            15,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.governing-bodies.index', compact('governingBodies', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.governing-bodies.create');
    }

    public function store(StoreGoverningBodyRequest $request)
    {
        $validated = $this->validatedAttributes($request->validated());
        $validated['published'] = $request->boolean('published');
        $validated['reverse_layout'] = $request->boolean('reverse_layout');
        unset($validated['photo'], $validated['photo_library_path']);

        $photoPath = $this->mediaUploads->resolveImage(
            $request,
            'photo',
            'photo_library_path',
            null,
            config('uploads.directories.governing_body'),
        );

        if ($photoPath) {
            $validated['photo_path'] = $photoPath;
        }

        GoverningBody::create($validated);

        return redirect()->route('admin.governing-bodies.index')
            ->with('success', 'Governing body member created successfully.');
    }

    public function edit(GoverningBody $governingBody)
    {
        return view('admin.governing-bodies.edit', compact('governingBody'));
    }

    public function update(UpdateGoverningBodyRequest $request, GoverningBody $governingBody)
    {
        $validated = $this->validatedAttributes($request->validated(), $governingBody);
        $validated['published'] = $request->boolean('published');
        $validated['reverse_layout'] = $request->boolean('reverse_layout');
        unset($validated['photo'], $validated['photo_library_path']);

        $photoPath = $this->mediaUploads->resolveImage(
            $request,
            'photo',
            'photo_library_path',
            $governingBody->photo_path,
            config('uploads.directories.governing_body'),
        );

        if ($photoPath) {
            $validated['photo_path'] = $photoPath;
        }

        $governingBody->update($validated);

        return redirect()->route('admin.governing-bodies.index')
            ->with('success', 'Governing body member updated successfully.');
    }

    public function destroy(GoverningBody $governingBody)
    {
        $this->uploads->delete($governingBody->photo_path);
        $governingBody->delete();

        return redirect()->route('admin.governing-bodies.index')
            ->with('success', 'Governing body member deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            GoverningBody::class,
            'admin.governing-bodies.index',
            function (GoverningBody $governingBody): void {
                $this->uploads->delete($governingBody->photo_path);
                $governingBody->delete();
            },
        );
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function validatedAttributes(array $validated, ?GoverningBody $existing = null): array
    {
        $validated['slug'] = UniqueSlug::forModel(
            GoverningBody::class,
            $validated['slug'] ?? null,
            $validated['name'],
            $existing?->id,
        );
        $validated['paragraphs'] = $this->richHtml->cleanParagraphs($validated['paragraphs'] ?? []);

        return $validated;
    }
}
