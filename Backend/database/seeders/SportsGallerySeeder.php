<?php

namespace Database\Seeders;

use App\Enums\GalleryMediaType;
use App\Models\GalleryAlbum;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class SportsGallerySeeder extends Seeder
{
    public const ALBUM_SLUG = 'sports-gallery';

    public function run(): void
    {
        $category = GalleryCategory::query()->firstOrCreate(
            ['slug' => 'sports'],
            [
                'name' => 'Sports',
                'description' => 'Campus sports and inter-college tournament photos.',
                'is_active' => true,
                'sort_order' => 4,
            ]
        );

        $album = GalleryAlbum::query()->updateOrCreate(
            ['slug' => self::ALBUM_SLUG],
            [
                'gallery_category_id' => $category->id,
                'title' => 'Sports Gallery',
                'description' => 'Photo carousel on the Sports Facilities page.',
                'published' => true,
                'is_featured' => false,
                'sort_order' => 50,
            ]
        );

        if ($album->media()->count() > 0) {
            return;
        }

        $sourceDir = dirname(base_path()).'/public/images/sports/carousel';
        if (! is_dir($sourceDir)) {
            $this->command?->warn('Sports gallery source images not found; skipping media seed.');

            return;
        }

        $files = collect(File::glob($sourceDir.'/sports-gallery-*.jpg'))
            ->sort()
            ->values();

        if ($files->isEmpty()) {
            $this->command?->warn('No sports gallery JPEG files found to seed.');

            return;
        }

        $featuredMediaId = null;

        foreach ($files as $index => $sourcePath) {
            $filename = basename($sourcePath);
            $storagePath = 'gallery/sports-gallery/'.$filename;

            Storage::disk('public')->put($storagePath, File::get($sourcePath));

            $media = GalleryMedia::query()->create([
                'gallery_album_id' => $album->id,
                'type' => GalleryMediaType::Image,
                'title' => 'Sports campus photo '.($index + 1),
                'image_path' => $storagePath,
                'sort_order' => $index,
            ]);

            if ($featuredMediaId === null) {
                $featuredMediaId = $media->id;
            }
        }

        if ($featuredMediaId !== null) {
            $album->update(['featured_media_id' => $featuredMediaId]);
        }

        $this->command?->info('Seeded sports gallery album with '.$files->count().' images.');
    }
}
