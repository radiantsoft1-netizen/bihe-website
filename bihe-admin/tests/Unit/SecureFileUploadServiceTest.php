<?php

namespace Tests\Unit;

use App\Services\SecureFileUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SecureFileUploadServiceTest extends TestCase
{
    protected SecureFileUploadService $service;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');
        Storage::fake('uploads');
        $this->service = app(SecureFileUploadService::class);
    }

    public function test_it_stores_valid_png_on_public_disk(): void
    {
        $file = UploadedFile::fake()->image('photo.png', 100, 100);

        $result = $this->service->store($file, 'image', 'gallery');

        $this->assertSame('public', $result->disk);
        $this->assertTrue(Storage::disk('public')->exists($result->path));
        $this->assertMatchesRegularExpression('/^gallery\/photo-[a-f0-9]{8}\.png$/', $result->path);
        $this->assertSame('photo.png', $result->sanitizedOriginalName);
    }

    public function test_it_stores_valid_pdf_on_private_uploads_disk(): void
    {
        $file = $this->fakePdf('resume.pdf');

        $result = $this->service->store($file, 'pdf', 'documents');

        $this->assertSame('uploads', $result->disk);
        $this->assertTrue(Storage::disk('uploads')->exists($result->path));
        $this->assertMatchesRegularExpression('/^documents\/resume-[a-f0-9]{8}\.pdf$/', $result->path);
        $this->assertSame('resume.pdf', $result->sanitizedOriginalName);
    }

    public function test_it_rejects_invalid_magic_bytes(): void
    {
        $file = UploadedFile::fake()->create('bad.pdf', 10, 'application/pdf');
        file_put_contents($file->getRealPath(), 'not-a-real-pdf');

        $this->expectException(ValidationException::class);
        $this->service->validateFile($file, 'pdf');
    }

    public function test_it_sanitizes_dangerous_original_names(): void
    {
        $sanitized = $this->service->sanitizeOriginalName('../../evil<script>.pdf');

        $this->assertStringNotContainsString('<', $sanitized);
        $this->assertStringNotContainsString('..', $sanitized);
    }

    protected function fakePdf(string $name): UploadedFile
    {
        $file = UploadedFile::fake()->create($name, 20, 'application/pdf');
        file_put_contents($file->getRealPath(), "%PDF-1.4\n% fake test pdf");

        return $file;
    }
}
