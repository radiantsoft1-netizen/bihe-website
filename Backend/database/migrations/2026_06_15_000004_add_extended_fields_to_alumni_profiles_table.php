<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->string('gender', 30)->nullable()->after('phone');
            $table->date('date_of_birth')->nullable()->after('gender');
            $table->string('current_location')->nullable()->after('date_of_birth');
            $table->string('class_section', 50)->nullable()->after('program');
            $table->unsignedSmallInteger('admission_year')->nullable()->after('class_section');
            $table->unsignedSmallInteger('passout_year')->nullable()->after('admission_year');
            $table->string('register_number', 60)->nullable()->after('passout_year');
            $table->string('current_status', 60)->nullable()->after('current_employer');
            $table->boolean('willing_to_mentor')->default(false)->after('current_status');
        });

        DB::table('alumni_profiles')
            ->whereNull('passout_year')
            ->whereNotNull('batch_year')
            ->update(['passout_year' => DB::raw('batch_year')]);
    }

    public function down(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'gender',
                'date_of_birth',
                'current_location',
                'class_section',
                'admission_year',
                'passout_year',
                'register_number',
                'current_status',
                'willing_to_mentor',
            ]);
        });
    }
};
