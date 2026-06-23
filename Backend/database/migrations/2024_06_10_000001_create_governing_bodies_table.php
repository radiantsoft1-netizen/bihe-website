<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('governing_bodies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('title_line');
            $table->string('qualifications');
            $table->string('badge');
            $table->string('title_lead');
            $table->string('title_accent');
            $table->json('paragraphs');
            $table->string('photo_path')->nullable();
            $table->string('image_alt');
            $table->boolean('reverse_layout')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('governing_bodies');
    }
};
