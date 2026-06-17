<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->index(['published', 'sort_order']);
            $table->index(['news_category_id', 'published']);
            $table->index(['is_featured', 'published']);
        });

        Schema::table('gallery_albums', function (Blueprint $table) {
            $table->index(['gallery_category_id', 'published']);
            $table->index(['published', 'sort_order']);
        });

        Schema::table('gallery_media', function (Blueprint $table) {
            $table->index(['gallery_album_id', 'type', 'sort_order']);
        });

        Schema::table('hero_banners', function (Blueprint $table) {
            $table->index(['active', 'sort_order']);
        });

        Schema::table('announcements', function (Blueprint $table) {
            $table->index('active');
        });
    }

    public function down(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->dropIndex(['published', 'sort_order']);
            $table->dropIndex(['news_category_id', 'published']);
            $table->dropIndex(['is_featured', 'published']);
        });

        Schema::table('gallery_albums', function (Blueprint $table) {
            $table->dropIndex(['gallery_category_id', 'published']);
            $table->dropIndex(['published', 'sort_order']);
        });

        Schema::table('gallery_media', function (Blueprint $table) {
            $table->dropIndex(['gallery_album_id', 'type', 'sort_order']);
        });

        Schema::table('hero_banners', function (Blueprint $table) {
            $table->dropIndex(['active', 'sort_order']);
        });

        Schema::table('announcements', function (Blueprint $table) {
            $table->dropIndex(['active']);
        });
    }
};
