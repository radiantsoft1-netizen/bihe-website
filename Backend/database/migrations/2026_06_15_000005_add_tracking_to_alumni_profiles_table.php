<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->string('tracking_id', 32)->nullable()->unique()->after('source');
            $table->string('notification_channel', 10)->nullable()->after('tracking_id');
        });
    }

    public function down(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->dropColumn(['tracking_id', 'notification_channel']);
        });
    }
};
