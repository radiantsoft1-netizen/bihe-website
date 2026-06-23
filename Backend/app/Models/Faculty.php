<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Faculty / staff roster (table: faculty — maps to user schema name faculty_members).
 */
class Faculty extends Model
{
    use SoftDeletes;

    protected $table = 'faculty';

    protected $fillable = [
        'name',
        'photo_path',
        'designation',
        'qualification',
        'experience',
        'seminar_workshop',
        'subject_teaching',
        'resume_path',
        'resume_name',
        'sort_order',
        'published',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'published' => 'boolean',
        ];
    }

    public function facultyDepartments(): BelongsToMany
    {
        return $this->belongsToMany(
            FacultyDepartment::class,
            'faculty_faculty_department',
            'faculty_id',
            'faculty_department_id'
        )->withTimestamps();
    }

    /** @return list<string> */
    public function departmentSlugs(): array
    {
        $departments = $this->relationLoaded('facultyDepartments')
            ? $this->facultyDepartments
            : $this->facultyDepartments()->get();

        return $departments
            ->sortBy(fn (FacultyDepartment $department) => [$department->sort_order, $department->id])
            ->pluck('slug')
            ->values()
            ->all();
    }

    public function getDepartmentAttribute(): ?string
    {
        return $this->departmentSlugs()[0] ?? null;
    }

    public function departmentLabel(): string
    {
        if ($this->relationLoaded('facultyDepartments')) {
            $labels = $this->facultyDepartments->pluck('name')->filter()->all();

            return $labels !== [] ? implode(', ', $labels) : '—';
        }

        $labels = $this->facultyDepartments()->pluck('name')->all();

        return $labels !== [] ? implode(', ', $labels) : '—';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }

    public function scopeByDepartment(Builder $query, string $department): Builder
    {
        return $query->whereHas(
            'facultyDepartments',
            fn (Builder $q) => $q->where('slug', $department)
        );
    }
}
