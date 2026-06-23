<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculty_faculty_department', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained('faculty')->cascadeOnDelete();
            $table->foreignId('faculty_department_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            // MySQL max identifier length is 64 chars; Laravel's default name is too long.
            $table->unique(['faculty_id', 'faculty_department_id'], 'faculty_dept_assignment_unique');
            $table->index('faculty_department_id');
        });

        if (Schema::hasColumn('faculty', 'faculty_department_id')) {
            DB::table('faculty')
                ->whereNotNull('faculty_department_id')
                ->orderBy('id')
                ->chunk(100, function ($rows): void {
                    $now = now();

                    foreach ($rows as $row) {
                        DB::table('faculty_faculty_department')->insertOrIgnore([
                            'faculty_id' => $row->id,
                            'faculty_department_id' => $row->faculty_department_id,
                            'created_at' => $now,
                            'updated_at' => $now,
                        ]);
                    }
                });

            Schema::table('faculty', function (Blueprint $table) {
                $table->dropForeign(['faculty_department_id']);
                $table->dropIndex(['faculty_department_id', 'published', 'sort_order']);
                $table->dropColumn('faculty_department_id');
            });
        }
    }

    public function down(): void
    {
        Schema::table('faculty', function (Blueprint $table) {
            $table->foreignId('faculty_department_id')
                ->nullable()
                ->after('id')
                ->constrained()
                ->restrictOnDelete();
        });

        $assignments = DB::table('faculty_faculty_department')
            ->orderBy('faculty_id')
            ->orderBy('id')
            ->get()
            ->groupBy('faculty_id');

        foreach ($assignments as $facultyId => $rows) {
            $primaryDepartmentId = $rows->first()->faculty_department_id;

            DB::table('faculty')
                ->where('id', $facultyId)
                ->update(['faculty_department_id' => $primaryDepartmentId]);
        }

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE faculty MODIFY faculty_department_id BIGINT UNSIGNED NOT NULL');
        }

        Schema::table('faculty', function (Blueprint $table) {
            $table->index(['faculty_department_id', 'published', 'sort_order']);
        });

        Schema::dropIfExists('faculty_faculty_department');
    }
};
