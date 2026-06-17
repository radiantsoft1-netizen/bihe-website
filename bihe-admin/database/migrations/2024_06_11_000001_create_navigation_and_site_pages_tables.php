<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('menu_key', 32);
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('label');
            $table->string('href', 512)->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->boolean('open_in_new_tab')->default(false);
            $table->timestamps();

            $table->index(['menu_key', 'parent_id', 'sort_order']);
        });

        Schema::create('site_pages', function (Blueprint $table) {
            $table->id();
            $table->string('path', 512)->unique();
            $table->string('slug', 120);
            $table->string('section', 64)->nullable();
            $table->string('template_key', 64);
            $table->string('title');
            $table->string('meta_description', 512)->nullable();
            $table->json('content')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['section', 'published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_pages');
        Schema::dropIfExists('menu_items');
    }
};
