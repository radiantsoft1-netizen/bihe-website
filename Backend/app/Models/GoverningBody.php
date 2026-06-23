<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoverningBody extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'name',
        'title_line',
        'qualifications',
        'badge',
        'title_lead',
        'title_accent',
        'paragraphs',
        'photo_path',
        'image_alt',
        'reverse_layout',
        'sort_order',
        'published',
    ];

    protected function casts(): array
    {
        return [
            'paragraphs' => 'array',
            'reverse_layout' => 'boolean',
            'sort_order' => 'integer',
            'published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}
