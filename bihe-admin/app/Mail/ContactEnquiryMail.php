<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactEnquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public array $enquiry)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[BIHE Website] '.$this->enquiry['subject'],
            replyTo: [$this->enquiry['email']],
        );
    }

    public function content(): Content
    {
        return new Content(
            text: 'emails.contact-enquiry',
        );
    }
}
