<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('info_corner_category_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId('info_corner_item_id')->constrained()->cascadeOnDelete();
            $table->foreignId('info_corner_category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['info_corner_item_id', 'info_corner_category_id'], 'info_corner_category_item_unique');
        });

        DB::table('info_corner_items')
            ->select(['id', 'info_corner_category_id'])
            ->orderBy('id')
            ->get()
            ->each(function ($item): void {
                DB::table('info_corner_category_item')->insert([
                    'info_corner_item_id' => $item->id,
                    'info_corner_category_id' => $item->info_corner_category_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            });

        Schema::table('info_corner_items', function (Blueprint $table) {
            $table->dropUnique(['info_corner_category_id', 'slug']);
            $table->unique('slug');
        });
    }

    public function down(): void
    {
        Schema::table('info_corner_items', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->unique(['info_corner_category_id', 'slug']);
        });

        Schema::dropIfExists('info_corner_category_item');
    }
};
