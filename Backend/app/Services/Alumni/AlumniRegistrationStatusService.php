<?php

namespace App\Services\Alumni;

use App\Models\AlumniProfile;

class AlumniRegistrationStatusService
{
    public function lookup(string $trackingId): ?array
    {
        $normalizedId = trim($trackingId);

        $profile = AlumniProfile::query()
            ->where('source', 'registration')
            ->where(function ($query) use ($normalizedId) {
                $query
                    ->where('tracking_id', $normalizedId)
                    ->orWhereRaw('LOWER(tracking_id) = ?', [strtolower($normalizedId)]);
            })
            ->first();

        if (! $profile) {
            return null;
        }

        return $this->formatStatus($profile);
    }

    protected function formatStatus(AlumniProfile $profile): array
    {
        $activeStep = match ($profile->approval_status) {
            'approved' => 4,
            'rejected' => 2,
            default => 2,
        };

        return [
            'trackingId' => $profile->tracking_id,
            'name' => $profile->name,
            'program' => $profile->program,
            'passoutYear' => $profile->displayPassoutYear(),
            'approvalStatus' => $profile->approval_status,
            'submittedAt' => $profile->submitted_at?->toIso8601String(),
            'approvedAt' => $profile->approved_at?->toIso8601String(),
            'rejectionNote' => $profile->rejection_note,
            'published' => $profile->published,
            'activeStep' => $activeStep,
        ];
    }
}
