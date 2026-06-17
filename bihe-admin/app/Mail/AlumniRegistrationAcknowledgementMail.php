<?php

namespace App\Mail;

use App\Models\AlumniProfile;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AlumniRegistrationAcknowledgementMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public AlumniProfile $profile)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'BIHE Alumni Registration — '.$this->profile->tracking_id,
        );
    }

    public function content(): Content
    {
        return new Content(
            text: 'emails.alumni-registration-acknowledgement',
        );
    }
}
