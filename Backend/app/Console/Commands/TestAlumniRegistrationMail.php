<?php

namespace App\Console\Commands;

use App\Mail\AlumniRegistrationAcknowledgementMail;
use App\Models\AlumniProfile;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Throwable;

class TestAlumniRegistrationMail extends Command
{
    protected $signature = 'alumni:test-registration-mail {email? : Recipient email address}';

    protected $description = 'Send a test alumni registration confirmation email';

    public function handle(): int
    {
        $email = $this->argument('email');

        $profile = AlumniProfile::query()
            ->where('source', 'registration')
            ->when($email, fn ($query) => $query->where('email', $email))
            ->orderByDesc('id')
            ->first();

        if (! $profile) {
            $this->error('No alumni registration found to test.');

            return self::FAILURE;
        }

        $delivery = (string) env('MAIL_DELIVERY', 'capture');
        $this->line("Delivery mode: {$delivery}");
        $this->line('SMTP host: '.config('mail.mailers.smtp.host').':'.config('mail.mailers.smtp.port'));

        try {
            Mail::to($profile->email)->send(new AlumniRegistrationAcknowledgementMail($profile));
            $this->info("Test email sent to {$profile->email} (ID: {$profile->tracking_id}).");

            if ($delivery === 'capture' || config('mail.mailers.smtp.host') === '127.0.0.1') {
                $this->line('Local capture inbox: http://127.0.0.1:8025');
            }

            return self::SUCCESS;
        } catch (Throwable $exception) {
            $this->error('Send failed: '.$exception->getMessage());

            if (str_contains($exception->getMessage(), 'Connection refused')) {
                $this->line('Start Mailpit: cd Backend && bash scripts/ensure-mailpit.sh');
                $this->line('Or set MAIL_DELIVERY=live with real SMTP credentials in .env');
            }

            return self::FAILURE;
        }
    }
}
