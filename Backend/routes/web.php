<?php

use App\Http\Controllers\PublicStorageController;
use App\Http\Controllers\Admin\AdminActivityLogController;
use App\Http\Controllers\Admin\AlumniEventController;
use App\Http\Controllers\Admin\AlumniProfileController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\CircularNoticeController;
use App\Http\Controllers\Admin\ChangePasswordController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\FacultyController;
use App\Http\Controllers\Admin\GoverningBodyController;
use App\Http\Controllers\Admin\MediaLibraryController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\PlacementDriveController;
use App\Http\Controllers\Admin\ProspectusSettingController;
use App\Http\Controllers\Admin\SiteMaintenanceController;
use App\Http\Controllers\Admin\SitePageController;
use App\Http\Controllers\Admin\GalleryAlbumController;
use App\Http\Controllers\Admin\HeroBannerController;
use App\Http\Controllers\Admin\GalleryCategoryController;
use App\Http\Controllers\Admin\InfoCornerCategoryController;
use App\Http\Controllers\Admin\InfoCornerItemController;
use App\Http\Controllers\Admin\NewsCategoryController;
use App\Http\Controllers\Admin\NewsEventController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ResearchDevelopmentCellController;
use App\Http\Controllers\Admin\RecruitingPartnerController;
use App\Http\Controllers\Admin\RichTextUploadController;
use App\Http\Controllers\Admin\SessionController;
use App\Http\Controllers\Admin\StoredFileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\CaptchaController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Support\AdminPermissions;
use Illuminate\Support\Facades\Route;

Route::get('/storage/{path}', [PublicStorageController::class, 'show'])
    ->where('path', '.*')
    ->name('storage.public');

Route::redirect('/', '/admin');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/', [LoginController::class, 'showLoginForm'])->name('login');
        Route::post('/', [LoginController::class, 'login']);
        Route::get('/captcha/refresh', [CaptchaController::class, 'refresh'])->name('captcha.refresh');

        Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm'])
            ->name('password.request');
        Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])
            ->middleware('throttle:password-reset')
            ->name('password.email');

        Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])
            ->name('password.reset');
        Route::post('/reset-password', [ResetPasswordController::class, 'reset'])
            ->middleware('throttle:password-reset')
            ->name('password.update');
    });

    Route::middleware(['auth', 'admin', 'session.inactivity', 'sanitize.input', 'log.admin.crud'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->middleware('permission:'.AdminPermissions::DASHBOARD_VIEW)
            ->name('dashboard');
        Route::redirect('/home', '/admin/dashboard');

        Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

        Route::post('rich-text/upload-image', [RichTextUploadController::class, 'store'])
            ->name('rich-text.upload-image');

        Route::get('media-library/categories', [MediaLibraryController::class, 'categories'])
            ->name('media-library.categories');
        Route::get('media-library/files', [MediaLibraryController::class, 'files'])
            ->name('media-library.files');
        Route::delete('media-library/files', [MediaLibraryController::class, 'destroy'])
            ->name('media-library.destroy');

        Route::middleware('permission:'.AdminPermissions::MEDIA_LIBRARY_VIEW)->group(function () {
            Route::get('media-library', [MediaLibraryController::class, 'index'])
                ->name('media-library.index');
            Route::post('media-library/upload', [MediaLibraryController::class, 'upload'])
                ->name('media-library.upload');
        });

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::get('change-password', [ChangePasswordController::class, 'edit'])->name('change-password.edit');
        Route::put('change-password', [ChangePasswordController::class, 'update'])->name('change-password.update');

        Route::middleware('permission:'.AdminPermissions::ANNOUNCEMENTS_MANAGE)->group(function () {
            Route::delete('announcements/bulk', [AnnouncementController::class, 'bulkDestroy'])
                ->name('announcements.bulk-destroy');
            Route::resource('announcements', AnnouncementController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::HERO_BANNERS_MANAGE)->group(function () {
            Route::delete('hero-banners/bulk', [HeroBannerController::class, 'bulkDestroy'])
                ->name('hero-banners.bulk-destroy');
            Route::resource('hero-banners', HeroBannerController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::RECRUITING_PARTNERS_MANAGE)->group(function () {
            Route::delete('recruiting-partners/bulk', [RecruitingPartnerController::class, 'bulkDestroy'])
                ->name('recruiting-partners.bulk-destroy');
            Route::resource('recruiting-partners', RecruitingPartnerController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::INFO_CORNER_MANAGE)->group(function () {
            Route::get('files/info-corner-items/{infoCornerItem}/pdf', [StoredFileController::class, 'infoCornerItemPdf'])
                ->name('files.info-corner-item-pdf');
            Route::get('info-corner-categories', [InfoCornerCategoryController::class, 'index'])
                ->name('info-corner-categories.index');
            Route::get('info-corner-categories/create', [InfoCornerCategoryController::class, 'create'])
                ->name('info-corner-categories.create');
            Route::post('info-corner-categories', [InfoCornerCategoryController::class, 'store'])
                ->name('info-corner-categories.store');
            Route::delete('info-corner-items/bulk', [InfoCornerItemController::class, 'bulkDestroy'])
                ->name('info-corner-items.bulk-destroy');
            Route::resource('info-corner-items', InfoCornerItemController::class)
                ->except(['show'])
                ->parameters(['info-corner-items' => 'infoCornerItem']);
        });

        Route::middleware('permission:'.AdminPermissions::PLACEMENT_DRIVES_MANAGE)->group(function () {
            Route::delete('placement-drives/bulk', [PlacementDriveController::class, 'bulkDestroy'])
                ->name('placement-drives.bulk-destroy');
            Route::resource('placement-drives', PlacementDriveController::class)
                ->except(['show'])
                ->parameters(['placement-drives' => 'placementDrive']);
        });

        Route::middleware('permission:'.AdminPermissions::ALUMNI_MANAGE)->group(function () {
            Route::delete('alumni-profiles/bulk', [AlumniProfileController::class, 'bulkDestroy'])
                ->name('alumni-profiles.bulk-destroy');
            Route::patch('alumni-profiles/sort-orders', [AlumniProfileController::class, 'updateSortOrders'])
                ->name('alumni-profiles.sort-orders');
            Route::patch('alumni-profiles/{alumniProfile}/sort-order', [AlumniProfileController::class, 'updateSortOrder'])
                ->name('alumni-profiles.sort-order');
            Route::post('alumni-profiles/{alumniProfile}/approve', [AlumniProfileController::class, 'approve'])
                ->name('alumni-profiles.approve');
            Route::post('alumni-profiles/{alumniProfile}/reject', [AlumniProfileController::class, 'reject'])
                ->name('alumni-profiles.reject');
            Route::resource('alumni-profiles', AlumniProfileController::class)
                ->except(['show'])
                ->parameters(['alumni-profiles' => 'alumniProfile']);

            Route::delete('alumni-events/bulk', [AlumniEventController::class, 'bulkDestroy'])
                ->name('alumni-events.bulk-destroy');
            Route::patch('alumni-events/sort-orders', [AlumniEventController::class, 'updateSortOrders'])
                ->name('alumni-events.sort-orders');
            Route::patch('alumni-events/{alumniEvent}/sort-order', [AlumniEventController::class, 'updateSortOrder'])
                ->name('alumni-events.sort-order');
            Route::resource('alumni-events', AlumniEventController::class)
                ->except(['show'])
                ->parameters(['alumni-events' => 'alumniEvent']);
        });

        Route::middleware('permission:'.AdminPermissions::CIRCULAR_NOTICES_MANAGE)->group(function () {
            Route::get('files/circular-notices/{circularNotice}/pdf', [StoredFileController::class, 'circularNoticePdf'])
                ->name('files.circular-notice-pdf');
            Route::delete('circular-notices/bulk', [CircularNoticeController::class, 'bulkDestroy'])
                ->name('circular-notices.bulk-destroy');
            Route::resource('circular-notices', CircularNoticeController::class)
                ->except(['show'])
                ->parameters(['circular-notices' => 'circularNotice']);
        });

        Route::middleware('permission:'.AdminPermissions::NEWS_MANAGE)->group(function () {
            Route::get('files/news-events/{newsEvent}/pdf', [StoredFileController::class, 'newsPdf'])
                ->name('files.news-pdf');
            Route::delete('news-categories/bulk', [NewsCategoryController::class, 'bulkDestroy'])
                ->name('news-categories.bulk-destroy');
            Route::delete('news-events/bulk', [NewsEventController::class, 'bulkDestroy'])
                ->name('news-events.bulk-destroy');
            Route::resource('news-categories', NewsCategoryController::class)->except(['show']);
            Route::resource('news-events', NewsEventController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::DOCUMENTS_MANAGE)->group(function () {
            Route::get('files/documents/{document}', [StoredFileController::class, 'document'])
                ->name('files.documents');
            Route::delete('documents/bulk', [DocumentController::class, 'bulkDestroy'])
                ->name('documents.bulk-destroy');
            Route::resource('documents', DocumentController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::GALLERY_MANAGE)->group(function () {
            Route::delete('gallery-categories/bulk', [GalleryCategoryController::class, 'bulkDestroy'])
                ->name('gallery-categories.bulk-destroy');
            Route::resource('gallery-categories', GalleryCategoryController::class)->except(['show']);
            Route::delete('gallery/bulk', [GalleryAlbumController::class, 'bulkDestroy'])
                ->name('gallery.bulk-destroy');
            Route::delete('gallery/{galleryAlbum}/media/{galleryMedia}', [GalleryAlbumController::class, 'destroyMedia'])
                ->name('gallery.media.destroy');
            Route::resource('gallery', GalleryAlbumController::class)
                ->except(['show'])
                ->parameters(['gallery' => 'galleryAlbum']);
        });

        Route::middleware('permission:'.AdminPermissions::FACULTY_MANAGE)->group(function () {
            Route::get('files/faculty/{faculty}/resume', [StoredFileController::class, 'facultyResume'])
                ->name('files.faculty-resume');
            Route::patch('faculty/sort-orders', [FacultyController::class, 'updateSortOrders'])
                ->name('faculty.sort-orders');
            Route::patch('faculty/{faculty}/sort-order', [FacultyController::class, 'updateSortOrder'])
                ->name('faculty.sort-order');
            Route::delete('faculty/bulk', [FacultyController::class, 'bulkDestroy'])
                ->name('faculty.bulk-destroy');
            Route::resource('faculty', FacultyController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::GOVERNING_BODIES_MANAGE)->group(function () {
            Route::delete('governing-bodies/bulk', [GoverningBodyController::class, 'bulkDestroy'])
                ->name('governing-bodies.bulk-destroy');
            Route::resource('governing-bodies', GoverningBodyController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::NAVIGATION_MANAGE)->group(function () {
            Route::delete('menu-items/bulk', [MenuItemController::class, 'bulkDestroy'])
                ->name('menu-items.bulk-destroy');
            Route::resource('menu-items', MenuItemController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::RDC_PROJECTS_MANAGE)->group(function () {
            Route::get('research-development-cell', [ResearchDevelopmentCellController::class, 'edit'])
                ->name('research-development-cell.edit');
            Route::put('research-development-cell', [ResearchDevelopmentCellController::class, 'update'])
                ->name('research-development-cell.update');
        });

        Route::middleware('permission:'.AdminPermissions::SITE_PAGES_MANAGE)->group(function () {
            Route::post('site-pages/import-content', [SitePageController::class, 'importAllContent'])
                ->name('site-pages.import-all-content');
            Route::post('site-pages/{sitePage}/import-content', [SitePageController::class, 'importContent'])
                ->name('site-pages.import-content');
            Route::delete('site-pages/bulk', [SitePageController::class, 'bulkDestroy'])
                ->name('site-pages.bulk-destroy');
            Route::resource('site-pages', SitePageController::class)->except(['show']);
        });

        Route::middleware('permission:'.AdminPermissions::USERS_MANAGE)->group(function () {
            Route::delete('users/bulk', [UserController::class, 'bulkDestroy'])
                ->name('users.bulk-destroy');
            Route::resource('users', UserController::class)->except(['show']);
            Route::get('users/{user}/reset-password', [UserController::class, 'showResetPasswordForm'])
                ->name('users.reset-password.form');
            Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])
                ->name('users.reset-password');
        });

        Route::middleware('permission:'.AdminPermissions::ACTIVITY_LOGS_VIEW)->group(function () {
            Route::get('activity-logs', [AdminActivityLogController::class, 'index'])->name('activity-logs.index');
        });

        Route::middleware('permission:'.AdminPermissions::SETTINGS_MANAGE)->group(function () {
            Route::get('settings/prospectus', [ProspectusSettingController::class, 'edit'])
                ->name('settings.prospectus.edit');
            Route::put('settings/prospectus', [ProspectusSettingController::class, 'update'])
                ->name('settings.prospectus.update');
            Route::get('settings/site-maintenance', [SiteMaintenanceController::class, 'edit'])
                ->name('settings.site-maintenance.edit');
            Route::put('settings/site-maintenance', [SiteMaintenanceController::class, 'update'])
                ->name('settings.site-maintenance.update');
        });

        Route::middleware('permission:'.AdminPermissions::SESSIONS_MANAGE)->group(function () {
            Route::get('sessions', [SessionController::class, 'index'])->name('sessions.index');
            Route::delete('sessions/{session}', [SessionController::class, 'destroy'])->name('sessions.destroy');
        });
    });
});
