<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculty_departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug', 30)->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });

        $now = now();
        $departments = [
            ['name' => 'B.Com Faculty', 'slug' => 'b-com', 'sort_order' => 0],
            ['name' => 'BCA Faculty', 'slug' => 'bca', 'sort_order' => 1],
            ['name' => 'Non Teaching Staff', 'slug' => 'non-teaching-staff', 'sort_order' => 2],
        ];

        foreach ($departments as $department) {
            DB::table('faculty_departments')->insert([
                ...$department,
                'description' => null,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        Schema::table('faculty', function (Blueprint $table) {
            $table->foreignId('faculty_department_id')
                ->nullable()
                ->after('id')
                ->constrained()
                ->restrictOnDelete();
        });

        if (Schema::hasColumn('faculty', 'department')) {
            $slugToId = DB::table('faculty_departments')->pluck('id', 'slug');

            DB::table('faculty')
                ->orderBy('id')
                ->chunk(100, function ($rows) use ($slugToId): void {
                    foreach ($rows as $row) {
                        $departmentId = $slugToId[$row->department] ?? $slugToId['b-com'];

                        DB::table('faculty')
                            ->where('id', $row->id)
                            ->update(['faculty_department_id' => $departmentId]);
                    }
                });

            Schema::table('faculty', function (Blueprint $table) {
                $table->dropColumn('department');
            });
        }

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE faculty MODIFY faculty_department_id BIGINT UNSIGNED NOT NULL');
        }

        Schema::table('faculty', function (Blueprint $table) {
            $table->index(['faculty_department_id', 'published', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::table('faculty', function (Blueprint $table) {
            $table->string('department', 30)->default('b-com')->after('experience');
        });

        $idToSlug = DB::table('faculty_departments')->pluck('slug', 'id');

        DB::table('faculty')
            ->orderBy('id')
            ->chunk(100, function ($rows) use ($idToSlug): void {
                foreach ($rows as $row) {
                    DB::table('faculty')
                        ->where('id', $row->id)
                        ->update(['department' => $idToSlug[$row->faculty_department_id] ?? 'b-com']);
                }
            });

        Schema::table('faculty', function (Blueprint $table) {
            $table->dropConstrainedForeignId('faculty_department_id');
        });

        Schema::dropIfExists('faculty_departments');
    }
};
