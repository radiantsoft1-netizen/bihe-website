<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Models\Document;
use App\Services\SecureFileUploadService;
use App\Rules\MediaLibraryPath;
use App\Support\AdminPagination;
use App\Support\MediaUploadResolver;
use App\Support\UploadedFileRules;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaUploadResolver $mediaUploads,
    ) {
    }

    public function index(Request $request)
    {
        $documents = AdminPagination::paginate(
            Document::query()->orderBy('sort_order')->orderByDesc('id'),
            $request,
            15,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.documents.index', compact('documents', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.documents.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'file' => UploadedFileRules::pdf(required: true),
            'file_library_path' => ['nullable', 'string', new MediaLibraryPath('pdf')],
            'published' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $pdf = $this->mediaUploads->resolvePdf(
            $request,
            'file',
            'file_library_path',
            null,
            config('uploads.directories.document'),
        );

        if (! $pdf) {
            return back()->withErrors(['file' => 'Please choose a PDF from the media library or upload one from your computer.'])->withInput();
        }

        $validated['file_path'] = $pdf['path'];
        $validated['file_name'] = $pdf['name'];
        $validated['file_size'] = $request->hasFile('file') ? $request->file('file')->getSize() : 0;
        $validated['published'] = $request->boolean('published');
        unset($validated['file'], $validated['file_library_path']);

        Document::create($validated);

        return redirect()->route('admin.documents.index')
            ->with('success', 'Document uploaded successfully.');
    }

    public function edit(Document $document)
    {
        return view('admin.documents.edit', compact('document'));
    }

    public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'file' => UploadedFileRules::pdf(),
            'file_library_path' => ['nullable', 'string', new MediaLibraryPath('pdf')],
            'published' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $pdf = $this->mediaUploads->resolvePdf(
            $request,
            'file',
            'file_library_path',
            $document->file_path,
            config('uploads.directories.document'),
        );

        if ($pdf) {
            $validated['file_path'] = $pdf['path'];
            $validated['file_name'] = $pdf['name'];
            if ($request->hasFile('file')) {
                $validated['file_size'] = $request->file('file')->getSize();
            }
        }

        $validated['published'] = $request->boolean('published');
        unset($validated['file'], $validated['file_library_path']);

        $document->update($validated);

        return redirect()->route('admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    public function destroy(Document $document)
    {
        $this->uploads->delete($document->file_path);
        $document->delete();

        return redirect()->route('admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            Document::class,
            'admin.documents.index',
            function (Document $document): void {
                $this->uploads->delete($document->file_path);
                $document->delete();
            },
        );
    }
}
