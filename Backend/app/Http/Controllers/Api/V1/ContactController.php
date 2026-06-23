<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ContactSubmitRequest;
use App\Mail\ContactAcknowledgementMail;
use App\Mail\ContactEnquiryMail;
use App\Services\ContactCaptchaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function captcha(ContactCaptchaService $captcha): JsonResponse
    {
        $generated = $captcha->generate();

        return response()->json([
            'data' => [
                'captchaId' => $generated['captchaId'],
                'question' => $generated['question'],
            ],
        ]);
    }

    public function submit(ContactSubmitRequest $request, ContactCaptchaService $captcha): JsonResponse
    {
        $validated = $request->validated();

        if (! $captcha->validate($validated['captcha_id'], $validated['captcha_answer'])) {
            throw ValidationException::withMessages([
                'captcha_answer' => ['Incorrect CAPTCHA answer. Please try again.'],
            ]);
        }

        $enquiry = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'mobile' => $validated['mobile'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'submitted_at' => now()->timezone(config('app.timezone'))->format('d M Y, H:i T'),
            'ip_address' => $request->ip(),
        ];

        $notifyEmail = config('contact.notify_email');

        try {
            Mail::to($notifyEmail)->send(new ContactEnquiryMail($enquiry));
            Mail::to($enquiry['email'])->send(new ContactAcknowledgementMail($enquiry));
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Unable to send your message right now. Please try again later or contact us by phone.',
            ], 503);
        }

        return response()->json([
            'message' => 'Thank you. Your enquiry has been sent and an acknowledgement email is on its way.',
        ]);
    }
}
