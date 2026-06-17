<?php

namespace App\Services;

use App\DataTransferObjects\SecureUploadResult;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SecureFileUploadService
{
    /**
     * @throws ValidationException
     */
    public function validateFile(UploadedFile $file, string $type): void
    {
        $config = $this->typeConfig($type);

        if (! $file->isValid()) {
            throw ValidationException::withMessages([
                'file' => 'The uploaded file is invalid or incomplete.',
            ]);
        }

        $maxBytes = $config['max_size_kb'] * 1024;
        if ($file->getSize() > $maxBytes) {
            throw ValidationException::withMessages([
                'file' => sprintf(
                    'The file may not be larger than %d KB.',
                    $config['max_size_kb']
                ),
            ]);
        }

        $detectedMime = $this->detectMime($file);
        if (! in_array($detectedMime, $config['mimes'], true)) {
            throw ValidationException::withMessages([
                'file' => 'The file type is not allowed.',
            ]);
        }

        $extension = strtolower($file->getClientOriginalExtension());
        if (! in_array($extension, $config['extensions'], true)) {
            throw ValidationException::withMessages([
                'file' => 'The file extension is not allowed.',
            ]);
        }

        if (! $this->matchesMagicBytes($file, $detectedMime, $config)) {
            throw ValidationException::withMessages([
                'file' => 'The file contents do not match the declared type.',
            ]);
        }

        if ($type === 'pdf' && $this->containsEmbeddedScript($file)) {
            throw ValidationException::withMessages([
                'file' => 'The PDF file contains disallowed content.',
            ]);
        }
    }

    /**
     * @throws ValidationException
     */
    public function store(UploadedFile $file, string $type, string $directory): SecureUploadResult
    {
        $this->validateFile($file, $type);

        $config = $this->typeConfig($type);
        $disk = $config['disk'];
        $filename = $this->buildUniqueFilename($file, $type, $directory, $disk);
        $path = trim($directory, '/').'/'.$filename;

        if ($type === 'image' && $config['strip_metadata']) {
            $contents = $this->reencodeImage($file, $this->detectMime($file));
            Storage::disk($disk)->put($path, $contents);
        } else {
            $stream = fopen($file->getRealPath(), 'rb');
            Storage::disk($disk)->put($path, $stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }

        return new SecureUploadResult(
            path: $path,
            disk: $disk,
            mime: $this->detectMime($file),
            size: (int) Storage::disk($disk)->size($path),
            sanitizedOriginalName: $this->sanitizeOriginalName($file->getClientOriginalName()),
        );
    }

    public function sanitizeOriginalName(string $name): string
    {
        $name = basename(str_replace(['\\', "\0"], ['/', ''], $name));
        $name = preg_replace('/[^\w\.\- ]+/u', '', $name) ?? 'file';
        $name = trim($name, ".\x00..\x20");

        return Str::limit($name !== '' ? $name : 'file', 255, '');
    }

    public function delete(?string $path, ?string $preferredDisk = null): void
    {
        if (! $path) {
            return;
        }

        if ($preferredDisk && Storage::disk($preferredDisk)->exists($path)) {
            Storage::disk($preferredDisk)->delete($path);

            return;
        }

        foreach (['uploads', 'public'] as $disk) {
            if (Storage::disk($disk)->exists($path)) {
                Storage::disk($disk)->delete($path);

                return;
            }
        }
    }

    public function resolveDisk(string $path, ?string $preferredDisk = null): ?string
    {
        if ($preferredDisk && Storage::disk($preferredDisk)->exists($path)) {
            return $preferredDisk;
        }

        foreach (['uploads', 'public'] as $disk) {
            if (Storage::disk($disk)->exists($path)) {
                return $disk;
            }
        }

        return null;
    }

    public function publicUrl(?string $path, ?string $disk = null): ?string
    {
        if (! $path) {
            return null;
        }

        $resolvedDisk = $this->resolveDisk($path, $disk);

        if ($resolvedDisk === 'public') {
            $encodedPath = collect(explode('/', str_replace('\\', '/', $path)))
                ->map(fn (string $segment) => rawurlencode($segment))
                ->implode('/');

            return asset('storage/'.$encodedPath);
        }

        return null;
    }

    public function stream(
        string $path,
        ?string $disk,
        string $filename,
        string $disposition = 'inline',
        ?string $mime = null,
    ): StreamedResponse {
        $resolvedDisk = $this->resolveDisk($path, $disk);

        if (! $resolvedDisk) {
            abort(404);
        }

        $storage = Storage::disk($resolvedDisk);
        $safeName = $this->sanitizeOriginalName($filename);
        $contentType = $mime ?: ($storage->mimeType($path) ?: 'application/octet-stream');

        return response()->stream(function () use ($storage, $path) {
            echo $storage->get($path);
        }, 200, [
            'Content-Type' => $contentType,
            'Content-Disposition' => $disposition.'; filename="'.$safeName.'"',
            'X-Content-Type-Options' => 'nosniff',
            'Cache-Control' => 'private, max-age=3600',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    protected function typeConfig(string $type): array
    {
        $config = config("uploads.types.{$type}");

        if (! is_array($config)) {
            throw new \InvalidArgumentException("Unknown upload type [{$type}].");
        }

        return $config;
    }

    protected function detectMime(UploadedFile $file): string
    {
        $mime = $file->getMimeType() ?: '';
        $guessed = @mime_content_type($file->getRealPath()) ?: '';

        if ($guessed !== '' && $guessed !== 'application/octet-stream') {
            return strtolower($guessed);
        }

        return strtolower($mime);
    }

    /**
     * @param  array<string, mixed>  $config
     */
    protected function matchesMagicBytes(UploadedFile $file, string $mime, array $config): bool
    {
        $signatures = $config['magic'][$mime] ?? null;

        if (! is_array($signatures) || $signatures === []) {
            return false;
        }

        $handle = fopen($file->getRealPath(), 'rb');
        if (! $handle) {
            return false;
        }

        $header = fread($handle, 12) ?: '';
        fclose($handle);

        foreach ($signatures as $signature) {
            if (str_starts_with($header, $signature)) {
                if ($mime === 'image/webp') {
                    return str_starts_with(substr($header, 8, 4), 'WEBP');
                }

                return true;
            }
        }

        return false;
    }

    protected function buildUniqueFilename(
        UploadedFile $file,
        string $type,
        string $directory,
        string $disk,
    ): string {
        $originalName = $this->sanitizeOriginalName($file->getClientOriginalName());
        $extension = $this->resolveStorageExtension($file, $type);
        $stem = pathinfo($originalName, PATHINFO_FILENAME);
        $stem = trim($stem, '. ');
        $stem = preg_replace('/\s+/', '-', $stem) ?? $stem;
        $stem = preg_replace('/-+/', '-', $stem) ?? $stem;

        if ($stem === '') {
            $stem = 'file';
        }

        $baseDirectory = trim($directory, '/');

        for ($attempt = 0; $attempt < 10; $attempt++) {
            $uniqueId = substr(str_replace('-', '', Str::uuid()->toString()), 0, 8);
            $filename = $stem.'-'.$uniqueId.'.'.$extension;
            $path = $baseDirectory.'/'.$filename;

            if (! Storage::disk($disk)->exists($path)) {
                return $filename;
            }
        }

        return Str::uuid()->toString().'.'.$extension;
    }

    protected function resolveStorageExtension(UploadedFile $file, string $type): string
    {
        $mime = $this->detectMime($file);

        return match ($type) {
            'image' => match ($mime) {
                'image/jpeg' => 'jpg',
                'image/png' => 'png',
                'image/gif' => 'gif',
                'image/webp' => 'webp',
                default => 'bin',
            },
            'pdf' => 'pdf',
            default => 'bin',
        };
    }

    protected function reencodeImage(UploadedFile $file, string $mime): string
    {
        $sourcePath = $file->getRealPath();

        $image = match ($mime) {
            'image/jpeg' => @imagecreatefromjpeg($sourcePath),
            'image/png' => @imagecreatefrompng($sourcePath),
            'image/gif' => @imagecreatefromgif($sourcePath),
            'image/webp' => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($sourcePath) : false,
            default => false,
        };

        if ($image === false) {
            throw ValidationException::withMessages([
                'file' => 'The image could not be processed safely.',
            ]);
        }

        ob_start();

        $written = match ($mime) {
            'image/jpeg' => imagejpeg($image, null, 90),
            'image/png' => imagepng($image, null, 6),
            'image/gif' => imagegif($image),
            'image/webp' => function_exists('imagewebp') ? imagewebp($image, null, 90) : false,
            default => false,
        };

        imagedestroy($image);

        if ($written === false) {
            ob_end_clean();
            throw ValidationException::withMessages([
                'file' => 'The image could not be processed safely.',
            ]);
        }

        return (string) ob_get_clean();
    }

    protected function containsEmbeddedScript(UploadedFile $file): bool
    {
        $sample = file_get_contents($file->getRealPath(), false, null, 0, 65536) ?: '';

        return (bool) preg_match('/\/(JavaScript|JS|OpenAction|AA)\b/i', $sample);
    }
}
