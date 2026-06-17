<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CheckAlumniRegistrationStatusRequest;
use App\Http\Requests\Api\RegisterAlumniProfileRequest;
use App\Services\Alumni\AlumniProfileService;
use App\Services\Alumni\AlumniRegistrationNotificationService;
use App\Services\Alumni\AlumniRegistrationStatusService;
use App\Services\ContactCaptchaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class AlumniRegistrationController extends Controller
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

    public function register(
        RegisterAlumniProfileRequest $request,
        AlumniProfileService $profiles,
        AlumniRegistrationNotificationService $notifications,
        ContactCaptchaService $captcha,
    ): JsonResponse {
        $validated = $request->validated();

        if (! $captcha->validate($validated['captcha_id'], $validated['captcha_answer'])) {
            throw ValidationException::withMessages([
                'captcha_answer' => ['Incorrect CAPTCHA answer. Please try again.'],
            ]);
        }

        $profile = $profiles->registerFromPublic($request);
        $notification = $notifications->send($profile);

        return response()->json([
            'message' => 'Thank you. Your alumni profile has been submitted and will appear in the directory after admin approval.',
            'data' => [
                'trackingId' => $profile->tracking_id,
                'notificationSent' => $notification['sent'],
                'notificationLogged' => $notification['logged'],
                'notificationError' => $notification['error'],
                'activeStep' => 2,
            ],
        ], 201);
    }

    public function status(
        CheckAlumniRegistrationStatusRequest $request,
        AlumniRegistrationStatusService $status,
    ): JsonResponse {
        $validated = $request->validated();
        $result = $status->lookup($validated['tracking_id']);

        if ($result === null) {
            return response()->json([
                'message' => 'No registration found for that ID. Please check your registration ID and try again.',
            ], 404);
        }

        return response()->json([
            'data' => $result,
        ]);
    }
}
