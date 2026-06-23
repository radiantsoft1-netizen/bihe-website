<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CircularNotice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'subtitle',
        'excerpt',
        'body',
        'image_path',
        'image_alt',
        'pdf_path',
        'pdf_name',
        'published_date',
        'published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'published_date' => 'date',
            'published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}
