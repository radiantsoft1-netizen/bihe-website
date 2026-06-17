<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class InfoCornerItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'info_corner_category_id',
        'title',
        'badge_text',
        'badge_visible',
        'slug',
        'subtitle',
        'excerpt',
        'body',
        'image_path',
        'image_alt',
        'pdf_path',
        'pdf_name',
        'external_link',
        'published_date',
        'show_in_home_scroller',
        'published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'published_date' => 'date',
            'show_in_home_scroller' => 'boolean',
            'badge_visible' => 'boolean',
            'published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(InfoCornerCategory::class, 'info_corner_category_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            InfoCornerCategory::class,
            'info_corner_category_item',
            'info_corner_item_id',
            'info_corner_category_id',
        )->withTimestamps();
    }

    public function images(): HasMany
    {
        return $this->hasMany(InfoCornerItemImage::class)->orderBy('sort_order')->orderBy('id');
    }

    public function scopeInCategory(Builder $query, string $categorySlug): Builder
    {
        return $query->whereHas('categories', fn (Builder $builder) => $builder
            ->where('slug', $categorySlug)
            ->published());
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }

    public function scopeHomeScroller(Builder $query): Builder
    {
        return $query->where('show_in_home_scroller', true);
    }
}
