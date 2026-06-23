<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Public Next.js website
    |--------------------------------------------------------------------------
    |
    | When admin content changes, Laravel pings the site's /api/revalidate so
    | cached pages refresh without waiting for the default revalidate interval.
    |
    | Local:  NEXTJS_URL=http://127.0.0.1:3000
    | Prod:   NEXTJS_URL=https://bihedvg.org
    |
    | If Hostinger CDN blocks server-to-server POSTs to the public domain, set
    | WEBSITE_REVALIDATE_URL to the Node.js internal URL from hPanel (e.g.
    | http://127.0.0.1:3000) — same REVALIDATE_SECRET as the Node.js app.
    |
    */

    'nextjs_url' => rtrim((string) env('NEXTJS_URL', 'http://127.0.0.1:3000'), '/'),

    /** @var list<string> */
    'revalidate_urls' => array_values(array_unique(array_filter(array_map(
        static fn (?string $url): ?string => $url ? rtrim($url, '/') : null,
        [
            env('WEBSITE_REVALIDATE_URL'),
            env('NEXTJS_URL', 'http://127.0.0.1:3000'),
        ]
    )))),

    'revalidate_secret' => env('REVALIDATE_SECRET'),

];
