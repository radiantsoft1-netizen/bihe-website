<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Public Next.js website
    |--------------------------------------------------------------------------
    |
    | When admin content changes, Laravel can ping the site's revalidate API so
    | cached pages refresh without waiting for the default revalidate interval.
    |
    */

    'nextjs_url' => rtrim((string) env('NEXTJS_URL', 'http://127.0.0.1:3000'), '/'),

    'revalidate_secret' => env('REVALIDATE_SECRET'),

];
