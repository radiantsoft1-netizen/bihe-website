<?php

return [
    'notify_email' => env('CONTACT_NOTIFY_EMAIL', 'principal@bihedvg.org'),
    'throttle_per_minute' => (int) env('CONTACT_FORM_THROTTLE', 5),
    'captcha_throttle_per_minute' => (int) env('CONTACT_CAPTCHA_THROTTLE', 20),
    'captcha_ttl_seconds' => 600,
];
