<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MediaLibraryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MediaLibraryController extends Controller
{
    public function __construct(private MediaLibraryService $mediaLibrary)
    {
    }

    public function index()
    {
        return view('admin.media-library.index', [
            'imageCategories' => $this->mediaLibrary->categories('image'),
            'pdfCategories' => $this->mediaLibrary->categories('pdf'),
            'imageMaxKb' => (int) config('uploads.types.image.max_size_kb'),
            'pdfMaxKb' => (int) config('uploads.types.pdf.max_size_kb'),
        ]);
    }

    public function categories(Request $request): JsonResponse
    {
        $type = $request->query('type');
        $type = in_array($type, ['image', 'pdf'], true) ? $type : null;

        return response()->json([
            'data' => $this->mediaLibrary->categories($type),
        ]);
    }

    public function files(Request $request): JsonResponse
    {
        $category = (string) $request->query('category', '');

        if ($category === '') {
            return response()->json(['data' => []]);
        }

        return response()->json([
            'data' => $this->mediaLibrary->files($category),
        ]);
    }

    public function upload(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string'],
            'files' => ['required', 'array', 'min:1'],
            'files.*' => ['required', 'file'],
        ]);

        $category = $this->mediaLibrary->category($validated['category']);

        if ($category === null) {
            throw ValidationException::withMessages([
                'category' => 'The selected upload category is invalid.',
            ]);
        }

        $uploaded = [];

        foreach ($request->file('files', []) as $file) {
            $uploaded[] = $this->mediaLibrary->upload($validated['category'], $file);
        }

        return response()->json([
            'data' => $uploaded,
            'category' => $this->mediaLibrary->category($validated['category']),
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => ['required', 'string'],
            'paths' => ['required', 'array', 'min:1'],
            'paths.*' => ['required', 'string'],
        ]);

        if ($this->mediaLibrary->category($validated['category']) === null) {
            throw ValidationException::withMessages([
                'category' => 'The selected upload category is invalid.',
            ]);
        }

        $deleted = $this->mediaLibrary->deleteFiles($validated['category'], $validated['paths']);

        return response()->json([
            'data' => [
                'deleted' => $deleted,
                'count' => count($deleted),
            ],
            'category' => $this->mediaLibrary->category($validated['category']),
        ]);
    }
}
