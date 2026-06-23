<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('info_corner_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('info_corner_category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->string('subtitle')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('body')->nullable();
            $table->string('image_path')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('pdf_path')->nullable();
            $table->string('pdf_name')->nullable();
            $table->string('external_link')->nullable();
            $table->date('published_date')->nullable();
            $table->boolean('show_in_home_scroller')->default(false);
            $table->boolean('published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['info_corner_category_id', 'slug'], 'info_corner_cat_slug_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('info_corner_items');
    }
};
