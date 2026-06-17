<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('placement_drives', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('eyebrow')->nullable();
            $table->text('description')->nullable();
            $table->string('hero_lead')->nullable();
            $table->date('event_date')->nullable();
            $table->string('date_label')->nullable();
            $table->string('year_label')->nullable();
            $table->longText('intro_body')->nullable();
            $table->string('section2_title')->nullable();
            $table->longText('section2_body')->nullable();
            $table->json('gallery_images')->nullable();
            $table->boolean('published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placement_drives');
    }
};
