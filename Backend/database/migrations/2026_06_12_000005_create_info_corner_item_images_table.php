<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('info_corner_item_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('info_corner_item_id')->constrained()->cascadeOnDelete();
            $table->string('image_path');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        if (Schema::hasTable('info_corner_items')) {
            DB::table('info_corner_items')
                ->whereNotNull('image_path')
                ->orderBy('id')
                ->each(function (object $item): void {
                    DB::table('info_corner_item_images')->insert([
                        'info_corner_item_id' => $item->id,
                        'image_path' => $item->image_path,
                        'sort_order' => 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('info_corner_item_images');
    }
};
