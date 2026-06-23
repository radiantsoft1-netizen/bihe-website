<?php

return [
    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // Future Phase — student portal (@see docs/FUTURE-PHASES.md §7)
        // 'student' => [
        //     'driver' => 'session',
        //     'provider' => 'students',
        // ],
    ],
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', App\Models\User::class),
        ],

        // Future Phase — student portal
        // 'students' => [
        //     'driver' => 'eloquent',
        //     'model' => App\Models\Student::class,
        // ],
    ],
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],
    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),
    'login_throttle' => env('AUTH_LOGIN_THROTTLE', 5),
];
