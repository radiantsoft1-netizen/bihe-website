<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if ($this->app->environment('local')) {
            Model::preventLazyLoading();
        }

        Paginator::defaultView('pagination.default');

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return url('/admin/reset-password/'.$token.'?email='.urlencode($notifiable->getEmailForPasswordReset()));
        });

        RateLimiter::for('password-reset', function (Request $request) {
            return Limit::perMinute(3)->by($request->ip());
        });

        RateLimiter::for('contact-form', function (Request $request) {
            $limit = (int) config('contact.throttle_per_minute', 5);

            return Limit::perMinute($limit)->by($request->ip());
        });

        RateLimiter::for('contact-captcha', function (Request $request) {
            $limit = (int) config('contact.captcha_throttle_per_minute', 20);

            return Limit::perMinute($limit)->by($request->ip());
        });

        $this->configureMailDelivery();
    }

    protected function configureMailDelivery(): void
    {
        $delivery = (string) env('MAIL_DELIVERY', 'capture');
        $username = env('MAIL_USERNAME');
        $password = env('MAIL_PASSWORD');
        $host = (string) env('MAIL_HOST', '127.0.0.1');

        $hasLiveCredentials = filled($username)
            && filled($password)
            && ! in_array($username, ['null', 'NULL'], true)
            && ! in_array($password, ['null', 'NULL'], true);

        $useLiveSmtp = $delivery === 'live' || ($hasLiveCredentials && $host !== '127.0.0.1');

        if ($useLiveSmtp) {
            return;
        }

        config([
            'mail.mailers.smtp.host' => '127.0.0.1',
            'mail.mailers.smtp.port' => 1025,
            'mail.mailers.smtp.username' => null,
            'mail.mailers.smtp.password' => null,
            'mail.mailers.smtp.encryption' => null,
        ]);
    }
}
