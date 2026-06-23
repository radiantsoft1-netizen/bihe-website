<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->string('approval_status', 20)->default('approved')->after('published');
            $table->string('source', 30)->default('admin')->after('approval_status');
            $table->string('email')->nullable()->after('name');
            $table->string('phone', 30)->nullable()->after('email');
            $table->timestamp('submitted_at')->nullable()->after('sort_order');
            $table->timestamp('approved_at')->nullable()->after('submitted_at');
            $table->text('rejection_note')->nullable()->after('approved_at');
        });
    }

    public function down(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'approval_status',
                'source',
                'email',
                'phone',
                'submitted_at',
                'approved_at',
                'rejection_note',
            ]);
        });
    }
};
