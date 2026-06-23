<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Services\SecureFileUploadService;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentController extends Controller
{
    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $query = Document::published()
            ->orderBy('sort_order')
            ->orderByDesc('id');

        if ($request->filled('category')) {
            $query->where('category', $request->query('category'));
        }

        $data = $query->get()->map(fn ($item) => [
            'id' => (string) $item->id,
            'title' => $item->title,
            'category' => $item->category,
            'fileName' => $item->file_name,
            'fileUrl' => StoredFileUrl::documentFile($item->id),
            'fileSize' => $item->file_size,
            'published' => $item->published,
            'sortOrder' => $item->sort_order,
        ]);

        return response()->json(['data' => $data]);
    }

    public function file(Document $document): StreamedResponse
    {
        if (! $document->published || ! $document->file_path) {
            abort(404);
        }

        if (! $this->uploads->resolveDisk($document->file_path)) {
            abort(404);
        }

        return $this->uploads->stream(
            $document->file_path,
            null,
            $document->file_name ?: 'document.pdf',
            'inline',
            'application/pdf',
        );
    }
}
