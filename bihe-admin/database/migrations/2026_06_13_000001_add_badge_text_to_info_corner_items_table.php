<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('info_corner_items', function (Blueprint $table) {
            $table->string('badge_text', 30)->nullable()->after('title');
        });
    }

    public function down(): void
    {
        Schema::table('info_corner_items', function (Blueprint $table) {
            $table->dropColumn('badge_text');
        });
    }
};
