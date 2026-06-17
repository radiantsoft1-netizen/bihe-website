<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_albums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('published')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_album_id')->constrained()->cascadeOnDelete();
            $table->string('type', 20)->default('image');
            $table->string('title')->nullable();
            $table->string('image_path')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('youtube_id', 32)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::table('gallery_albums', function (Blueprint $table) {
            $table->foreignId('featured_media_id')
                ->nullable()
                ->after('description')
                ->constrained('gallery_media')
                ->nullOnDelete();
        });

        $this->migrateLegacyGalleryItems();
    }

    public function down(): void
    {
        Schema::table('gallery_albums', function (Blueprint $table) {
            $table->dropConstrainedForeignId('featured_media_id');
        });

        Schema::dropIfExists('gallery_media');
        Schema::dropIfExists('gallery_albums');
        Schema::dropIfExists('gallery_categories');
    }

    protected function migrateLegacyGalleryItems(): void
    {
        if (! Schema::hasTable('gallery_items')) {
            return;
        }

        $items = DB::table('gallery_items')->orderBy('sort_order')->orderBy('id')->get();
        if ($items->isEmpty()) {
            return;
        }

        $categoryMap = [];

        foreach ($items as $item) {
            $categoryName = $item->category ?: 'General';
            $categorySlug = Str::slug($categoryName);

            if (! isset($categoryMap[$categorySlug])) {
                $categoryId = DB::table('gallery_categories')->insertGetId([
                    'name' => $categoryName,
                    'slug' => $categorySlug,
                    'description' => null,
                    'is_active' => true,
                    'sort_order' => count($categoryMap),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $categoryMap[$categorySlug] = $categoryId;
            }

            $albumId = DB::table('gallery_albums')->insertGetId([
                'gallery_category_id' => $categoryMap[$categorySlug],
                'title' => $item->title,
                'slug' => Str::slug($item->title).'-'.$item->id,
                'description' => $item->details,
                'published' => (bool) $item->published,
                'is_featured' => $item->sort_order < 5,
                'sort_order' => (int) $item->sort_order,
                'created_at' => $item->created_at ?? now(),
                'updated_at' => $item->updated_at ?? now(),
            ]);

            if ($item->image_path) {
                $mediaId = DB::table('gallery_media')->insertGetId([
                    'gallery_album_id' => $albumId,
                    'type' => 'image',
                    'title' => $item->title,
                    'image_path' => $item->image_path,
                    'youtube_url' => null,
                    'youtube_id' => null,
                    'sort_order' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('gallery_albums')->where('id', $albumId)->update([
                    'featured_media_id' => $mediaId,
                ]);
            }
        }
    }
};
