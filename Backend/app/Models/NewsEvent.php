<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsEvent extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'news_category_id',
        'title',
        'slug',
        'summary',
        'body',
        'image_path',
        'pdf_path',
        'pdf_name',
        'event_date',
        'published',
        'is_featured',
        'show_in_ticker',
        'sort_order',
        'seo_title',
        'seo_description',
        'seo_keywords',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'published' => 'boolean',
            'is_featured' => 'boolean',
            'show_in_ticker' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeTicker(Builder $query): Builder
    {
        return $query->where('show_in_ticker', true);
    }
}
