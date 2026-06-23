<?php

namespace App\Services\Alumni;

use App\Mail\AlumniRegistrationAcknowledgementMail;
use App\Models\AlumniProfile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class AlumniRegistrationNotificationService
{
    /**
     * @return array{sent: bool, logged: bool, error: string|null}
     */
    public function send(AlumniProfile $profile): array
    {
        if (! $profile->email) {
            return [
                'sent' => false,
                'logged' => false,
                'error' => 'No email address on the registration.',
            ];
        }

        try {
            Mail::to($profile->email)->send(new AlumniRegistrationAcknowledgementMail($profile));

            return [
                'sent' => true,
                'logged' => false,
                'error' => null,
            ];
        } catch (Throwable $exception) {
            report($exception);

            $logged = $this->logFallback($profile, $exception);

            return [
                'sent' => false,
                'logged' => $logged,
                'error' => $this->publicErrorMessage($exception),
            ];
        }
    }

    protected function logFallback(AlumniProfile $profile, Throwable $exception): bool
    {
        try {
            Mail::mailer('log')->to($profile->email)->send(new AlumniRegistrationAcknowledgementMail($profile));

            return true;
        } catch (Throwable $logException) {
            report($logException);

            Log::error('Alumni registration email could not be sent or logged.', [
                'tracking_id' => $profile->tracking_id,
                'email' => $profile->email,
                'mail_error' => $exception->getMessage(),
                'log_error' => $logException->getMessage(),
            ]);

            return false;
        }
    }

    protected function publicErrorMessage(Throwable $exception): string
    {
        $message = $exception->getMessage();

        if (str_contains($message, 'Connection could not be established')
            || str_contains($message, 'Connection refused')) {
            return 'Email could not be sent because the mail server is not configured or not running.';
        }

        return 'Email could not be sent right now. Please save your registration ID shown on screen.';
    }
}
