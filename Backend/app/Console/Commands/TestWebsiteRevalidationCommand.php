<?php

namespace App\Console\Commands;

use App\Services\WebsiteRevalidationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TestWebsiteRevalidationCommand extends Command
{
    protected $signature = 'website:test-revalidation';

    protected $description = 'Ping the public Next.js /api/revalidate endpoint (checks cache refresh wiring)';

    public function handle(WebsiteRevalidationService $revalidation): int
    {
        $urls = config('website.revalidate_urls', []);
        $secret = config('website.revalidate_secret');

        if ($urls === []) {
            $this->error('No revalidate URLs configured. Set NEXTJS_URL in .env');

            return self::FAILURE;
        }

        if (! $secret) {
            $this->error('REVALIDATE_SECRET is missing in .env');

            return self::FAILURE;
        }

        $this->line('Configured URLs (tried in order):');
        foreach ($urls as $url) {
            $this->line("  • {$url}/api/revalidate");
        }
        $this->newLine();

        $ok = false;

        foreach ($urls as $baseUrl) {
            $endpoint = $baseUrl.'/api/revalidate';

            try {
                $response = Http::timeout(10)
                    ->withHeaders([
                        'User-Agent' => 'BIHE-Admin-Revalidate/1.0',
                        'Accept' => 'application/json',
                    ])
                    ->post($endpoint, [
                        'secret' => $secret,
                        'paths' => ['/'],
                        'tags' => ['api:/api/v1/announcements'],
                    ]);

                if ($response->successful()) {
                    $this->info("OK {$endpoint}");
                    $this->line($response->body());
                    $ok = true;
                    break;
                }

                $this->warn("FAIL {$endpoint} — HTTP {$response->status()}");
                $this->line(mb_substr($response->body(), 0, 300));
            } catch (\Throwable $exception) {
                $this->warn("FAIL {$endpoint} — {$exception->getMessage()}");
            }
        }

        if (! $ok) {
            $this->newLine();
            $this->error('Revalidation failed on all URLs.');
            $this->line('Production fix: set WEBSITE_REVALIDATE_URL to the Node.js internal URL from hPanel,');
            $this->line('or whitelist /api/revalidate in Hostinger CDN / bot protection.');

            return self::FAILURE;
        }

        $this->newLine();
        $this->info('Service revalidate() check:');
        $serviceOk = $revalidation->revalidate(['/'], ['api:/api/v1/announcements']);
        $this->line($serviceOk ? 'OK — WebsiteRevalidationService' : 'FAIL — WebsiteRevalidationService');

        return $serviceOk ? self::SUCCESS : self::FAILURE;
    }
}
