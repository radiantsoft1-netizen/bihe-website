<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlacementDrive extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'eyebrow',
        'description',
        'hero_lead',
        'event_date',
        'date_label',
        'year_label',
        'intro_body',
        'section2_title',
        'section2_body',
        'gallery_images',
        'published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'gallery_images' => 'array',
            'published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}
