<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlumniProfile extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'name',
        'email',
        'phone',
        'gender',
        'date_of_birth',
        'current_location',
        'batch_year',
        'program',
        'class_section',
        'admission_year',
        'passout_year',
        'register_number',
        'current_role',
        'current_employer',
        'current_status',
        'willing_to_mentor',
        'bio',
        'testimonial',
        'photo_path',
        'linkedin_url',
        'is_featured',
        'published',
        'approval_status',
        'source',
        'tracking_id',
        'notification_channel',
        'submitted_at',
        'approved_at',
        'rejection_note',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'batch_year' => 'integer',
            'admission_year' => 'integer',
            'passout_year' => 'integer',
            'willing_to_mentor' => 'boolean',
            'is_featured' => 'boolean',
            'published' => 'boolean',
            'sort_order' => 'integer',
            'date_of_birth' => 'date',
            'submitted_at' => 'datetime',
            'approved_at' => 'datetime',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('approval_status', 'approved');
    }

    public function scopePublicDirectory(Builder $query): Builder
    {
        return $query->published()->approved();
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('approval_status', 'pending');
    }

    public function displayPassoutYear(): ?int
    {
        return $this->passout_year ?? $this->batch_year;
    }
}
