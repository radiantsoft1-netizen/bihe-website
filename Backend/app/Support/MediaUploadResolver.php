<?php

namespace App\Support;

use App\Services\MediaLibraryService;
use App\Services\SecureFileUploadService;
use Illuminate\Http\Request;

class MediaUploadResolver
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
    ) {
    }

    public function resolveImage(
        Request $request,
        string $field,
        string $libraryField,
        ?string $existingPath,
        string $directory,
    ): ?string {
        if ($request->hasFile($field)) {
            if ($existingPath) {
                $this->uploads->delete($existingPath);
            }

            $upload = $this->uploads->store(
                $request->file($field),
                'image',
                $directory,
            );

            return $upload->path;
        }

        if ($request->filled($libraryField)) {
            $libraryPath = (string) $request->input($libraryField);

            if ($this->mediaLibrary->validatePath($libraryPath, 'image')) {
                if ($existingPath && $existingPath !== $libraryPath) {
                    $this->uploads->delete($existingPath);
                }

                return $libraryPath;
            }
        }

        return null;
    }

    /**
     * @return array{path: string, name: string}|null
     */
    public function resolvePdf(
        Request $request,
        string $field,
        string $libraryField,
        ?string $existingPath,
        string $directory,
    ): ?array {
        if ($request->hasFile($field)) {
            if ($existingPath) {
                $this->uploads->delete($existingPath);
            }

            $upload = $this->uploads->store(
                $request->file($field),
                'pdf',
                $directory,
            );

            return [
                'path' => $upload->path,
                'name' => $upload->sanitizedOriginalName,
            ];
        }

        if ($request->filled($libraryField)) {
            $libraryPath = (string) $request->input($libraryField);

            if ($this->mediaLibrary->validatePath($libraryPath, 'pdf')) {
                if ($existingPath && $existingPath !== $libraryPath) {
                    $this->uploads->delete($existingPath);
                }

                return [
                    'path' => $libraryPath,
                    'name' => basename($libraryPath),
                ];
            }
        }

        return null;
    }
}
