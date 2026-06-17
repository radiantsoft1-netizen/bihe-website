<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class InfoCornerCategory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'sort_order',
        'published',
    ];

    protected function casts(): array
    {
        return [
            'published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function items(): HasMany
    {
        return $this->hasMany(InfoCornerItem::class, 'info_corner_category_id');
    }

    public function assignedItems(): BelongsToMany
    {
        return $this->belongsToMany(
            InfoCornerItem::class,
            'info_corner_category_item',
            'info_corner_category_id',
            'info_corner_item_id',
        )->withTimestamps();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}
