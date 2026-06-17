<?php

namespace App\Models;

use App\Enums\GalleryMediaType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryMedia extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'gallery_album_id',
        'type',
        'title',
        'image_path',
        'youtube_url',
        'youtube_id',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'type' => GalleryMediaType::class,
            'sort_order' => 'integer',
        ];
    }

    public function album(): BelongsTo
    {
        return $this->belongsTo(GalleryAlbum::class, 'gallery_album_id');
    }

    public function isImage(): bool
    {
        return $this->type === GalleryMediaType::Image;
    }

    public function isYoutube(): bool
    {
        return $this->type === GalleryMediaType::Youtube;
    }

    public function scopeImages(Builder $query): Builder
    {
        return $query->where('type', GalleryMediaType::Image->value);
    }

    public function scopeVideos(Builder $query): Builder
    {
        return $query->where('type', GalleryMediaType::Youtube->value);
    }
}
