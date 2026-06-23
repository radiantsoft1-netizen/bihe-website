<?php

namespace App\Services;

use App\Http\Requests\Admin\UpdateProspectusSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\UploadedFile;

class ProspectusSettingService
{
    public const KEY = 'prospectus';

    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
    ) {
    }

    /** @return array{label: string, file_path: string|null, file_name: string|null, enabled: bool} */
    public function get(): array
    {
        $setting = SiteSetting::query()->firstOrCreate(
            ['key' => self::KEY],
            ['value' => $this->defaultValue()],
        );

        return array_merge($this->defaultValue(), is_array($setting->value) ? $setting->value : []);
    }

    /** @return array{label: string, pdfUrl: string, fileName: string, openInNewTab: bool}|null */
    public function publicPayload(): ?array
    {
        $setting = $this->get();

        if (! ($setting['enabled'] ?? true) || empty($setting['file_path'])) {
            return null;
        }

        return [
            'label' => $setting['label'] ?: 'Prospectus',
            'pdfUrl' => url('/api/v1/site-settings/prospectus/pdf'),
            'fileName' => $setting['file_name'] ?: 'prospectus.pdf',
            'openInNewTab' => true,
        ];
    }

    public function update(UpdateProspectusSettingRequest $request): SiteSetting
    {
        $setting = SiteSetting::query()->firstOrCreate(
            ['key' => self::KEY],
            ['value' => $this->defaultValue()],
        );

        $current = $this->get();
        $validated = $request->validated();
        $value = [
            'label' => trim((string) ($validated['label'] ?? 'Prospectus')) ?: 'Prospectus',
            'file_path' => $current['file_path'] ?? null,
            'file_name' => $current['file_name'] ?? null,
            'enabled' => $request->boolean('enabled', true),
        ];

        if ($request->hasFile('pdf')) {
            if (! empty($current['file_path'])) {
                $this->uploads->delete($current['file_path']);
            }

            $upload = $this->uploads->store(
                $request->file('pdf'),
                'pdf',
                config('uploads.directories.prospectus_pdf'),
            );

            $value['file_path'] = $upload->path;
            $value['file_name'] = $upload->sanitizedOriginalName;
        } elseif ($request->filled('pdf_library_path')) {
            $libraryPath = (string) $request->input('pdf_library_path');

            if ($this->mediaLibrary->validatePath($libraryPath, 'pdf')) {
                if (! empty($current['file_path']) && $current['file_path'] !== $libraryPath) {
                    $this->uploads->delete($current['file_path']);
                }

                $value['file_path'] = $libraryPath;
                $value['file_name'] = basename($libraryPath);
            }
        }

        $setting->value = $value;
        $setting->save();

        return $setting;
    }

    public function seedDefaultPdf(UploadedFile $file): void
    {
        $setting = SiteSetting::query()->firstOrCreate(
            ['key' => self::KEY],
            ['value' => $this->defaultValue()],
        );

        $current = array_merge($this->defaultValue(), is_array($setting->value) ? $setting->value : []);

        if (! empty($current['file_path'])) {
            return;
        }

        $upload = $this->uploads->store(
            $file,
            'pdf',
            config('uploads.directories.prospectus_pdf'),
        );

        $setting->value = [
            'label' => $current['label'] ?? 'Prospectus',
            'file_path' => $upload->path,
            'file_name' => $upload->sanitizedOriginalName,
            'enabled' => true,
        ];
        $setting->save();
    }

    /** @return array{label: string, file_path: null, file_name: null, enabled: true} */
    protected function defaultValue(): array
    {
        return [
            'label' => 'Prospectus',
            'file_path' => null,
            'file_name' => null,
            'enabled' => true,
        ];
    }
}
