<?php

namespace App\Services;

use App\DataTransferObjects\SecureUploadResult;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class MediaLibraryService
{
    /** @var array<string, array{label: string, type: string, disk: string, directory: string}> */
    private array $categories;

    public function __construct(private SecureFileUploadService $uploads)
    {
        $this->categories = $this->buildCategories();
    }

    /**
     * @return list<array{key: string, label: string, type: string, count: int}>
     */
    public function categories(?string $type = null): array
    {
        $result = [];

        foreach ($this->categories as $key => $meta) {
            if ($type !== null && $meta['type'] !== $type) {
                continue;
            }

            $result[] = [
                'key' => $key,
                'label' => $meta['label'],
                'type' => $meta['type'],
                'count' => count($this->listCategoryFiles($key)),
            ];
        }

        return $result;
    }

    /**
     * @return list<array{path: string, name: string, url: ?string, type: string, size: int, modified_at: int}>
     */
    public function files(string $categoryKey): array
    {
        if (! isset($this->categories[$categoryKey])) {
            return [];
        }

        return $this->listCategoryFiles($categoryKey);
    }

    public function validatePath(string $path, string $type): bool
    {
        $path = $this->normalizePath($path);

        if ($path === '' || str_contains($path, '..')) {
            return false;
        }

        foreach ($this->categories as $meta) {
            if ($meta['type'] !== $type) {
                continue;
            }

            $prefix = $this->directoryPrefix($meta['directory']);

            if (! str_starts_with($path, $prefix)) {
                continue;
            }

            return Storage::disk($meta['disk'])->exists($path);
        }

        return false;
    }

    /**
     * @return array{key: string, label: string, type: string, disk: string, directory: string, count: int}|null
     */
    public function category(string $categoryKey): ?array
    {
        if (! isset($this->categories[$categoryKey])) {
            return null;
        }

        $meta = $this->categories[$categoryKey];

        return [
            'key' => $categoryKey,
            'label' => $meta['label'],
            'type' => $meta['type'],
            'disk' => $meta['disk'],
            'directory' => $meta['directory'],
            'count' => count($this->listCategoryFiles($categoryKey)),
        ];
    }

    /**
     * @return array{path: string, name: string, url: ?string, type: string, size: int, modified_at: int}
     *
     * @throws ValidationException
     */
    public function upload(string $categoryKey, UploadedFile $file): array
    {
        $meta = $this->categories[$categoryKey] ?? null;

        if ($meta === null) {
            throw ValidationException::withMessages([
                'category' => 'The selected upload category is invalid.',
            ]);
        }

        $result = $this->uploads->store($file, $meta['type'], $meta['directory']);

        return $this->fileFromUpload($result, $meta['type'], $meta['disk']);
    }

    /**
     * @param  list<string>  $paths
     * @return list<string>
     *
     * @throws ValidationException
     */
    public function deleteFiles(string $categoryKey, array $paths): array
    {
        $meta = $this->categories[$categoryKey] ?? null;

        if ($meta === null) {
            throw ValidationException::withMessages([
                'category' => 'The selected upload category is invalid.',
            ]);
        }

        $prefix = $this->directoryPrefix($meta['directory']);
        $deleted = [];

        foreach ($paths as $path) {
            $path = $this->normalizePath((string) $path);

            if ($path === '' || str_contains($path, '..') || ! str_starts_with($path, $prefix)) {
                throw ValidationException::withMessages([
                    'paths' => 'One or more selected files are invalid.',
                ]);
            }

            if (! Storage::disk($meta['disk'])->exists($path)) {
                continue;
            }

            $this->uploads->delete($path, $meta['disk']);
            $deleted[] = $path;
        }

        return $deleted;
    }

    /**
     * @return array{path: string, name: string, url: ?string, type: string, size: int, modified_at: int}
     */
    private function fileFromUpload(SecureUploadResult $result, string $type, string $disk): array
    {
        return [
            'path' => $result->path,
            'name' => basename($result->path),
            'display_name' => $this->displayName($result->sanitizedOriginalName, $type),
            'url' => $this->uploads->publicUrl($result->path, $disk),
            'type' => $type,
            'size' => $result->size,
            'modified_at' => (int) Storage::disk($disk)->lastModified($result->path),
        ];
    }

    private function displayName(string $basename, string $type): string
    {
        if (preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\./i', $basename)) {
            return $type === 'pdf' ? 'PDF document' : 'Uploaded image';
        }

        if (preg_match('/^(.+)-[a-f0-9]{8}(\.[^.]+)$/i', $basename, $matches)) {
            $basename = $matches[1].$matches[2];
        }

        if (strlen($basename) <= 28) {
            return $basename;
        }

        return substr($basename, 0, 14).'…'.substr($basename, -10);
    }

    /**
     * @return list<array{path: string, name: string, display_name: string, url: ?string, type: string, size: int, modified_at: int}>
     */
    private function listCategoryFiles(string $categoryKey): array
    {
        $meta = $this->categories[$categoryKey];
        $disk = Storage::disk($meta['disk']);
        $directory = trim($meta['directory'], '/');

        if (! $disk->exists($directory)) {
            return [];
        }

        $files = [];

        foreach ($disk->allFiles($directory) as $path) {
            $name = basename($path);

            if (str_starts_with($name, '.')) {
                continue;
            }

            $files[] = [
                'path' => $path,
                'name' => $name,
                'display_name' => $this->displayName($name, $meta['type']),
                'url' => $this->uploads->publicUrl($path, $meta['disk']),
                'type' => $meta['type'],
                'size' => (int) $disk->size($path),
                'modified_at' => (int) $disk->lastModified($path),
            ];
        }

        usort($files, fn (array $a, array $b) => $b['modified_at'] <=> $a['modified_at']);

        return $files;
    }

    /** @return array<string, array{label: string, type: string, disk: string, directory: string}> */
    private function buildCategories(): array
    {
        $directories = config('uploads.directories', []);
        $labels = [
            'faculty_photo' => 'Faculty Photos',
            'faculty_resume' => 'Faculty Resumes',
            'news_image' => 'News Images',
            'news_pdf' => 'News PDFs',
            'gallery' => 'Gallery',
            'document' => 'Documents',
            'hero_banner' => 'Hero Banners',
            'recruiting_partner' => 'Recruiter Logos',
            'info_corner_image' => 'Info Corner Images',
            'info_corner_pdf' => 'Info Corner PDFs',
            'circular_notice_image' => 'Circular Notice Images',
            'circular_notice_pdf' => 'Circular Notice PDFs',
            'governing_body' => 'Governing Bodies',
            'rich_text' => 'Rich Text Images',
            'download_file' => 'Downloads',
            'alumni_photo' => 'Alumni Photos',
            'student_document' => 'Student Documents',
            'admission_document' => 'Admission Documents',
            'admission_photo' => 'Admission Photos',
            'company_logo' => 'Placement Logos',
            'placement_document' => 'Placement Documents',
        ];

        $categories = [];

        foreach ($directories as $key => $directory) {
            $type = str_contains($key, 'pdf')
                || str_contains($key, 'document')
                || str_contains($key, 'resume')
                || $key === 'download_file'
                ? 'pdf'
                : 'image';

            $disk = $type === 'image'
                ? (string) config('uploads.types.image.disk', 'public')
                : (string) config('uploads.types.pdf.disk', 'uploads');

            $categories[$key] = [
                'label' => $labels[$key] ?? Str::headline(str_replace('_', ' ', $key)),
                'type' => $type,
                'disk' => $disk,
                'directory' => $directory,
            ];
        }

        return $categories;
    }

    private function normalizePath(string $path): string
    {
        return ltrim(str_replace('\\', '/', trim($path)), '/');
    }

    private function directoryPrefix(string $directory): string
    {
        return trim($directory, '/').'/';
    }
}
