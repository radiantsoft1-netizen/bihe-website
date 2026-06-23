<?php

use App\Http\Controllers\Api\V1\AlumniEventController;
use App\Http\Controllers\Api\V1\AlumniProfileController;
use App\Http\Controllers\Api\V1\AlumniRegistrationController;
use App\Http\Controllers\Api\V1\AnnouncementController;
use App\Http\Controllers\Api\V1\CircularNoticeController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\DocumentController;
use App\Http\Controllers\Api\V1\FacultyController;
use App\Http\Controllers\Api\V1\GoverningBodyController;
use App\Http\Controllers\Api\V1\NavigationController;
use App\Http\Controllers\Api\V1\SitePageController;
use App\Http\Controllers\Api\V1\GalleryAlbumController;
use App\Http\Controllers\Api\V1\GalleryCategoryController;
use App\Http\Controllers\Api\V1\GalleryItemController;
use App\Http\Controllers\Api\V1\GalleryMediaController;
use App\Http\Controllers\Api\V1\InfoCornerCategoryController;
use App\Http\Controllers\Api\V1\InfoCornerItemController;
use App\Http\Controllers\Api\V1\NewsCategoryController;
use App\Http\Controllers\Api\V1\NewsEventController;
use App\Http\Controllers\Api\V1\PlacementDriveController;
use App\Http\Controllers\Api\V1\ProgramController;
use App\Http\Controllers\Api\V1\ProspectusSettingController;
use App\Http\Controllers\Api\V1\RecruitingPartnerController;
use App\Http\Controllers\Api\V1\HeroBannerController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public read endpoints
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/faculty/sections', [FacultyController::class, 'sections']);
    Route::get('/faculty/{faculty}/resume', [FacultyController::class, 'resume']);
    Route::get('/faculty', [FacultyController::class, 'index']);
    Route::get('/news-categories', [NewsCategoryController::class, 'index']);
    Route::get('/news/ticker', [NewsEventController::class, 'ticker']);
    Route::get('/news/{slug}/pdf', [NewsEventController::class, 'pdf']);
    Route::get('/news/{slug}', [NewsEventController::class, 'show']);
    Route::get('/news', [NewsEventController::class, 'index']);
    Route::get('/documents', [DocumentController::class, 'index']);
    Route::get('/documents/{document}/file', [DocumentController::class, 'file']);
    Route::get('/gallery-categories', [GalleryCategoryController::class, 'index']);
    Route::get('/gallery-albums', [GalleryAlbumController::class, 'index']);
    Route::get('/gallery-albums/{slug}', [GalleryAlbumController::class, 'show']);
    Route::get('/gallery-media/{galleryMedia}/preview', [GalleryMediaController::class, 'preview']);
    Route::get('/gallery', [GalleryItemController::class, 'index']);
    Route::get('/hero-banners', [HeroBannerController::class, 'index']);
    Route::get('/recruiting-partners', [RecruitingPartnerController::class, 'index']);
    Route::get('/governing-bodies', [GoverningBodyController::class, 'index']);
    Route::get('/navigation', [NavigationController::class, 'index']);
    Route::get('/site-pages', [SitePageController::class, 'index']);
    Route::get('/site-pages/show', [SitePageController::class, 'show']);

    Route::get('/info-corner/categories', [InfoCornerCategoryController::class, 'index']);
    Route::get('/info-corner/items/home-scroller', [InfoCornerItemController::class, 'homeScroller']);
    Route::get('/info-corner/items/{category}/{slug}/pdf', [InfoCornerItemController::class, 'pdf']);
    Route::get('/info-corner/items/{category}/{slug}', [InfoCornerItemController::class, 'show']);
    Route::get('/info-corner/items', [InfoCornerItemController::class, 'index']);
    Route::get('/circular-notices/{slug}/pdf', [CircularNoticeController::class, 'pdf']);
    Route::get('/circular-notices/{slug}', [CircularNoticeController::class, 'show']);
    Route::get('/circular-notices', [CircularNoticeController::class, 'index']);
    Route::get('/site-settings/prospectus/pdf', [ProspectusSettingController::class, 'pdf']);
    Route::get('/site-settings/prospectus', [ProspectusSettingController::class, 'show']);
    Route::get('/placement-drives/{slug}', [PlacementDriveController::class, 'show']);
    Route::get('/placement-drives', [PlacementDriveController::class, 'index']);
    Route::get('/alumni-profiles/{slug}', [AlumniProfileController::class, 'show']);
    Route::get('/alumni-profiles', [AlumniProfileController::class, 'index']);
    Route::get('/alumni-events/{slug}', [AlumniEventController::class, 'show']);
    Route::get('/alumni-events', [AlumniEventController::class, 'index']);
    Route::get('/alumni/register/captcha', [AlumniRegistrationController::class, 'captcha'])
        ->middleware('throttle:contact-captcha');
    Route::post('/alumni/register', [AlumniRegistrationController::class, 'register'])
        ->middleware('throttle:contact-form');
    Route::post('/alumni/register/status', [AlumniRegistrationController::class, 'status'])
        ->middleware('throttle:contact-form');
    Route::get('/contact/captcha', [ContactController::class, 'captcha'])
        ->middleware('throttle:contact-captcha');
    Route::post('/contact', [ContactController::class, 'submit'])
        ->middleware('throttle:contact-form');

    // Future write endpoints — protect with api.key middleware
    // Route::middleware('api.key')->group(function () { ... });
});
