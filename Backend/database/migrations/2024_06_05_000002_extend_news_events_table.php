<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->foreignId('news_category_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->string('pdf_path')->nullable()->after('image_path');
            $table->string('pdf_name')->nullable()->after('pdf_path');
            $table->boolean('is_featured')->default(false)->after('published');
            $table->boolean('show_in_ticker')->default(false)->after('is_featured');
            $table->string('seo_title')->nullable()->after('sort_order');
            $table->string('seo_description', 500)->nullable()->after('seo_title');
            $table->string('seo_keywords')->nullable()->after('seo_description');
        });
    }

    public function down(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->dropConstrainedForeignId('news_category_id');
            $table->dropColumn([
                'pdf_path',
                'pdf_name',
                'is_featured',
                'show_in_ticker',
                'seo_title',
                'seo_description',
                'seo_keywords',
            ]);
        });
    }
};
