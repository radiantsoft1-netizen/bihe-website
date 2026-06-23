<?php

namespace App\Console\Commands;

use App\Models\AlumniProfile;
use App\Services\Alumni\AlumniRegistrationNotificationService;
use Illuminate\Console\Command;

class ResendAlumniRegistrationEmail extends Command
{
    protected $signature = 'alumni:resend-registration-email {trackingId : The registration ID, e.g. AbhiBIHE#1414}';

    protected $description = 'Resend the alumni registration confirmation email for a tracking ID';

    public function handle(AlumniRegistrationNotificationService $notifications): int
    {
        $trackingId = trim((string) $this->argument('trackingId'));

        $profile = AlumniProfile::query()
            ->where(function ($query) use ($trackingId) {
                $query
                    ->where('tracking_id', $trackingId)
                    ->orWhereRaw('LOWER(tracking_id) = ?', [strtolower($trackingId)]);
            })
            ->where('source', 'registration')
            ->first();

        if (! $profile) {
            $this->error("No registration found for {$trackingId}.");

            return self::FAILURE;
        }

        $result = $notifications->send($profile);

        if ($result['sent']) {
            $this->info("Confirmation email sent to {$profile->email}.");

            return self::SUCCESS;
        }

        $this->warn("Email was not delivered to {$profile->email}.");
        if ($result['error']) {
            $this->line($result['error']);
        }
        if ($result['logged']) {
            $this->line('A copy was written to the Laravel log mailer.');
        }

        return self::FAILURE;
    }
}
