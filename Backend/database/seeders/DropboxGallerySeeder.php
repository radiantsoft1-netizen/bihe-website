<?php

namespace Database\Seeders;

use App\Enums\GalleryMediaType;
use App\Models\GalleryAlbum;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DropboxGallerySeeder extends Seeder
{
    /** @see scripts/import-dropbox-gallery.mjs */
    private const DROPBOX_SOURCES = [
        'cultura' => 'https://www.dropbox.com/scl/fo/xaytdbuzz9vokw6urahsj/AOOrF0lCPDPwE9TpifIXTQ4?rlkey=qw1acmmpxdodnc7k9flvap2yw&dl=1',
        'canteen' => 'https://www.dropbox.com/scl/fo/r5k77hbnn04io521f8mcn/AJDGy07SIw3x6K1ahvQhogo?rlkey=5wr7mmqn2xcqs1bd7uewtu9f6&dl=1',
        'campus-life' => 'https://www.dropbox.com/scl/fo/t1kx8xnqubzvkjf6ghzsm/ADEOWq5hcyPP4ZTqgMwwjUE?rlkey=awf8nferuwxa6865mbgf3e6s6&dl=1',
        'college' => 'https://www.dropbox.com/scl/fo/8hahdr5gdqpwau11od0n2/ABjKxJ_K7xBJ0h-ZXcLTiUo?rlkey=ronwgfu0jkfdrwzoq416hxxio&dl=1',
        'sports' => 'https://www.dropbox.com/scl/fo/by6g39gw7t56nwdvp6puu/AGER6tt4EcVpYXrXgxOrc8w?rlkey=5mpq67esam0nvf7c6tu8gqkg1&dl=1',
        'basketball' => 'https://www.dropbox.com/scl/fo/thmibpaujaopt0rbhp9f9/AJIYFQH98o-0Akim2R55vZE?rlkey=o9m5akc9dvhgi7tji9mwytbcl&dl=1',
    ];

    private const IMAGE_LIMIT = 15;

    /**
     * @var array<int, array{
     *     slug: string,
     *     title: string,
     *     category: string,
     *     description: string,
     *     featured: bool,
     * }>
     */
    private const ALBUMS = [
        [
            'slug' => 'inter-college-sports-meet',
            'title' => 'Inter-College Sports Meet',
            'category' => 'sports',
            'description' => 'Highlights from inter-college sports tournaments and campus athletics.',
            'featured' => true,
        ],
        [
            'slug' => 'basketball-championship',
            'title' => 'Basketball Championship',
            'category' => 'sports',
            'description' => 'Action from BIHE basketball matches and championship events.',
            'featured' => true,
        ],
        [
            'slug' => 'annual-events-celebrations',
            'title' => 'Events & Celebrations',
            'category' => 'events',
            'description' => 'Annual day, cultural programmes, and festive celebrations on campus.',
            'featured' => true,
        ],
        [
            'slug' => 'campus-facilities',
            'title' => 'Campus Facilities',
            'category' => 'facilities',
            'description' => 'Canteen, classrooms, and essential infrastructure across BIHE.',
            'featured' => true,
        ],
        [
            'slug' => 'campus-life-moments',
            'title' => 'Campus Life',
            'category' => 'campus',
            'description' => 'Everyday student life, gatherings, and memorable campus moments.',
            'featured' => true,
        ],
    ];

    public function run(): void
    {
        $this->seedCategories();
        $this->unpublishLegacyAlbums();

        foreach (self::ALBUMS as $index => $config) {
            $this->seedAlbum($config, $index);
        }

        $this->command?->info('Seeded '.count(self::ALBUMS).' Dropbox gallery albums.');
    }

    private function seedCategories(): void
    {
        $categories = [
            ['name' => 'Campus Life', 'slug' => 'campus', 'sort_order' => 0],
            ['name' => 'Academics', 'slug' => 'academics', 'sort_order' => 1],
            ['name' => 'Events & Festivals', 'slug' => 'events', 'sort_order' => 2],
            ['name' => 'Facilities', 'slug' => 'facilities', 'sort_order' => 3],
            ['name' => 'Sports & Recreation', 'slug' => 'sports', 'sort_order' => 4],
        ];

        foreach ($categories as $category) {
            GalleryCategory::query()->updateOrCreate(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'description' => null,
                    'is_active' => true,
                    'sort_order' => $category['sort_order'],
                ]
            );
        }
    }

    private function unpublishLegacyAlbums(): void
    {
        $managedSlugs = array_column(self::ALBUMS, 'slug');
        $managedSlugs[] = SportsGallerySeeder::ALBUM_SLUG;

        GalleryAlbum::query()
            ->whereNotIn('slug', $managedSlugs)
            ->update(['published' => false]);
    }

    /**
     * @param  array{slug: string, title: string, category: string, description: string, featured: bool}  $config
     */
    private function seedAlbum(array $config, int $sortOrder): void
    {
        $category = GalleryCategory::query()->where('slug', $config['category'])->first();
        if (! $category) {
            $this->command?->warn("Gallery category [{$config['category']}] missing; skipping {$config['slug']}.");

            return;
        }

        $album = GalleryAlbum::query()->updateOrCreate(
            ['slug' => $config['slug']],
            [
                'gallery_category_id' => $category->id,
                'title' => $config['title'],
                'description' => $config['description'],
                'published' => true,
                'is_featured' => $config['featured'],
                'sort_order' => $sortOrder,
            ]
        );

        $sourceDir = dirname(base_path()).'/public/images/gallery/'.$config['slug'];
        if (! is_dir($sourceDir)) {
            $this->command?->warn("Source images not found for {$config['slug']}; skipping media seed.");

            return;
        }

        $files = collect(File::glob($sourceDir.'/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', GLOB_BRACE))
            ->sort()
            ->values()
            ->take(self::IMAGE_LIMIT);

        if ($files->isEmpty()) {
            $this->command?->warn("No images found for {$config['slug']}.");

            return;
        }

        $album->media()->delete();
        $album->update(['featured_media_id' => null]);

        $featuredMediaId = null;

        foreach ($files as $index => $sourcePath) {
            $filename = basename($sourcePath);
            $storagePath = 'gallery/'.$config['slug'].'/'.$filename;

            Storage::disk('public')->put($storagePath, File::get($sourcePath));

            $media = GalleryMedia::query()->create([
                'gallery_album_id' => $album->id,
                'type' => GalleryMediaType::Image,
                'title' => $config['title'].' photo '.($index + 1),
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

        $this->command?->info("Seeded {$config['slug']} with {$files->count()} images.");
    }
}
