<?php

namespace App\Models;

use App\Enums\GalleryMediaType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryAlbum extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'gallery_category_id',
        'title',
        'slug',
        'description',
        'featured_media_id',
        'published',
        'is_featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'published' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(GalleryCategory::class, 'gallery_category_id');
    }

    public function media(): HasMany
    {
        return $this->hasMany(GalleryMedia::class)->orderBy('sort_order')->orderBy('id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(GalleryMedia::class)
            ->where('type', GalleryMediaType::Image->value)
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(GalleryMedia::class)
            ->where('type', GalleryMediaType::Youtube->value)
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    public function featuredMedia(): BelongsTo
    {
        return $this->belongsTo(GalleryMedia::class, 'featured_media_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }
}
