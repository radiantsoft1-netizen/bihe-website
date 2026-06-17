<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('faculty', function (Blueprint $table) {
            $table->string('photo_path')->nullable()->after('name');
            $table->text('seminar_workshop')->nullable()->after('experience');
            $table->text('subject_teaching')->nullable()->after('seminar_workshop');
            $table->string('resume_path')->nullable()->after('subject_teaching');
            $table->string('resume_name')->nullable()->after('resume_path');
            $table->boolean('published')->default(true)->after('sort_order');
        });

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE faculty MODIFY department VARCHAR(30) NOT NULL DEFAULT 'b-com'");
        }
    }

    public function down(): void
    {
        Schema::table('faculty', function (Blueprint $table) {
            $table->dropColumn([
                'photo_path',
                'seminar_workshop',
                'subject_teaching',
                'resume_path',
                'resume_name',
                'published',
            ]);
        });
    }
};
