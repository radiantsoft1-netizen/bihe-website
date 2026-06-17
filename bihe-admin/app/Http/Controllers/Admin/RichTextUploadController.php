<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SecureFileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class RichTextUploadController extends Controller
{
    public function __construct(private SecureFileUploadService $uploads)
    {
    }

    public function store(Request $request): JsonResponse|Response
    {
        try {
            $file = $request->file('upload');

            if (! $file) {
                return $this->respond($request, false, null, 'No file was uploaded.');
            }

            $result = $this->uploads->store(
                $file,
                'image',
                config('uploads.directories.rich_text')
            );

            $url = $this->uploads->publicUrl($result->path);

            if (! $url) {
                return $this->respond($request, false, null, 'The uploaded image could not be published.');
            }

            return $this->respond($request, true, $url, '');
        } catch (ValidationException $exception) {
            $message = collect($exception->errors())->flatten()->first() ?? 'Upload failed.';

            return $this->respond($request, false, null, (string) $message);
        }
    }

    private function respond(Request $request, bool $success, ?string $url, string $message): JsonResponse|Response
    {
        $funcNum = $request->query('CKEditorFuncNum');

        if ($funcNum !== null && $funcNum !== '') {
            $callback = (int) $funcNum;
            $escapedUrl = addslashes($success ? (string) $url : '');
            $escapedMessage = addslashes($success ? '' : $message);

            return response(
                "<script>window.parent.CKEDITOR.tools.callFunction({$callback}, '{$escapedUrl}', '{$escapedMessage}');</script>",
                200,
                ['Content-Type' => 'text/html; charset=utf-8']
            );
        }

        if ($success) {
            return response()->json([
                'uploaded' => 1,
                'fileName' => basename((string) $url),
                'url' => $url,
            ]);
        }

        return response()->json([
            'uploaded' => 0,
            'error' => ['message' => $message !== '' ? $message : 'Upload failed.'],
        ], 422);
    }
}
