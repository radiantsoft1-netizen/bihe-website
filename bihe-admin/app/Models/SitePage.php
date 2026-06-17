<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SitePage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'path',
        'slug',
        'section',
        'template_key',
        'title',
        'meta_description',
        'content',
        'sort_order',
        'published',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'sort_order' => 'integer',
            'published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}
