<?php

namespace App\Services;

use App\Http\Requests\Admin\UpdateSiteMaintenanceRequest;
use App\Models\SiteSetting;

class SiteMaintenanceService
{
    public const KEY = 'site_maintenance';

    /** @return array{enabled: bool, mode: string, headline: string, message: string, contact_email: string|null} */
    public function get(): array
    {
        $setting = SiteSetting::query()->firstOrCreate(
            ['key' => self::KEY],
            ['value' => $this->defaultValue()],
        );

        return array_merge($this->defaultValue(), is_array($setting->value) ? $setting->value : []);
    }

    /** @return array{enabled: bool, mode: string, headline: string, message: string, contactEmail: string|null} */
    public function publicPayload(): array
    {
        $setting = $this->get();

        return [
            'enabled' => (bool) ($setting['enabled'] ?? false),
            'mode' => in_array($setting['mode'] ?? '', ['construction', 'staging'], true)
                ? $setting['mode']
                : 'construction',
            'headline' => trim((string) ($setting['headline'] ?? '')) ?: $this->defaultHeadline($setting['mode'] ?? 'construction'),
            'message' => trim((string) ($setting['message'] ?? '')) ?: $this->defaultMessage($setting['mode'] ?? 'construction'),
            'contactEmail' => filled($setting['contact_email'] ?? null)
                ? trim((string) $setting['contact_email'])
                : null,
        ];
    }

    public function update(UpdateSiteMaintenanceRequest $request): SiteSetting
    {
        $setting = SiteSetting::query()->firstOrCreate(
            ['key' => self::KEY],
            ['value' => $this->defaultValue()],
        );

        $validated = $request->validated();
        $mode = in_array($validated['mode'] ?? '', ['construction', 'staging'], true)
            ? $validated['mode']
            : 'construction';

        $setting->value = [
            'enabled' => $request->boolean('enabled'),
            'mode' => $mode,
            'headline' => trim((string) ($validated['headline'] ?? '')) ?: $this->defaultHeadline($mode),
            'message' => trim((string) ($validated['message'] ?? '')) ?: $this->defaultMessage($mode),
            'contact_email' => filled($validated['contact_email'] ?? null)
                ? trim((string) $validated['contact_email'])
                : null,
        ];
        $setting->save();

        return $setting;
    }

    /** @return array{enabled: bool, mode: string, headline: string, message: string, contact_email: null} */
    protected function defaultValue(): array
    {
        return [
            'enabled' => false,
            'mode' => 'construction',
            'headline' => $this->defaultHeadline('construction'),
            'message' => $this->defaultMessage('construction'),
            'contact_email' => null,
        ];
    }

    protected function defaultHeadline(string $mode): string
    {
        return $mode === 'staging'
            ? 'Staging Preview'
            : 'Website Under Maintenance';
    }

    protected function defaultMessage(string $mode): string
    {
        return $mode === 'staging'
            ? 'This is a private staging preview of the BIHE website. The public site is temporarily unavailable while updates are being reviewed.'
            : 'We are updating the BIHE website to serve you better. Please check back soon.';
    }
}
