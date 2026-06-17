<?php

namespace App\Services;

use App\Http\Requests\Admin\StoreInfoCornerItemRequest;
use App\Http\Requests\Admin\UpdateInfoCornerItemRequest;
use App\Models\InfoCornerCategory;
use App\Models\InfoCornerItem;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class InfoCornerItemService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
        private RichHtmlSanitizer $richHtml,
    ) {
    }

    public function paginateForIndex(int $perPage = 15): LengthAwarePaginator
    {
        return InfoCornerItem::query()
            ->select([
                'id',
                'info_corner_category_id',
                'title',
                'slug',
                'published_date',
                'show_in_home_scroller',
                'published',
            ])
            ->with([
                'category:id,name,slug',
                'categories:id,name,slug',
            ])
            ->orderByDesc('published_date')
            ->orderBy('sort_order')
            ->paginate($perPage);
    }

    public function activeCategories(): Collection
    {
        return InfoCornerCategory::published()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();
    }

    public function create(StoreInfoCornerItemRequest $request): InfoCornerItem
    {
        $categoryIds = $this->normalizeCategoryIds($request);
        $item = new InfoCornerItem($this->prepareAttributes($request, categoryIds: $categoryIds));
        $item->save();
        $item->categories()->sync($categoryIds);
        $this->syncImages($request, $item);

        return $item->load(['categories', 'images']);
    }

    public function update(UpdateInfoCornerItemRequest $request, InfoCornerItem $infoCornerItem): InfoCornerItem
    {
        $categoryIds = $this->normalizeCategoryIds($request);
        $infoCornerItem->fill($this->prepareAttributes($request, $infoCornerItem, $categoryIds));
        $infoCornerItem->save();
        $infoCornerItem->categories()->sync($categoryIds);
        $this->syncImages($request, $infoCornerItem);

        return $infoCornerItem->load(['categories', 'images']);
    }

    public function delete(InfoCornerItem $infoCornerItem): void
    {
        foreach ($infoCornerItem->images as $image) {
            $this->uploads->delete($image->image_path);
        }

        $this->uploads->delete($infoCornerItem->image_path);
        $this->uploads->delete($infoCornerItem->pdf_path);
        $infoCornerItem->delete();
    }

    /** @return list<int> */
    protected function normalizeCategoryIds(
        StoreInfoCornerItemRequest|UpdateInfoCornerItemRequest $request,
    ): array {
        $categoryIds = collect($request->input('category_ids', []))
            ->map(fn ($id) => (int) $id)
            ->filter()
            ->unique()
            ->values()
            ->all();

        if ($categoryIds === []) {
            return [];
        }

        return $categoryIds;
    }

    /**
     * @param  list<int>  $categoryIds
     */
    protected function prepareAttributes(
        StoreInfoCornerItemRequest|UpdateInfoCornerItemRequest $request,
        ?InfoCornerItem $existing = null,
        array $categoryIds = [],
    ): array {
        $validated = $request->validated();
        $categoryIds = $categoryIds !== [] ? $categoryIds : $this->normalizeCategoryIds($request);

        $validated['info_corner_category_id'] = $categoryIds[0];
        $validated['slug'] = $this->uniqueSlug(
            $validated['slug'] ?? null,
            $validated['title'],
            $existing?->id
        );
        $validated['published'] = $request->boolean('published');
        $validated['show_in_home_scroller'] = $request->boolean('show_in_home_scroller');
        $validated['badge_visible'] = $request->boolean('badge_visible');

        if ($request->exists('body')) {
            $validated['body'] = $request->input('body');
        }

        $validated = $this->richHtml->cleanFields($validated, ['excerpt', 'body']);
        unset(
            $validated['category_ids'],
            $validated['images'],
            $validated['image_library_paths'],
            $validated['keep_image_ids'],
            $validated['pdf'],
            $validated['pdf_library_path'],
        );

        if ($request->hasFile('pdf')) {
            if ($existing?->pdf_path) {
                $this->uploads->delete($existing->pdf_path);
            }

            $upload = $this->uploads->store(
                $request->file('pdf'),
                'pdf',
                config('uploads.directories.info_corner_pdf')
            );
            $validated['pdf_path'] = $upload->path;
            $validated['pdf_name'] = $upload->sanitizedOriginalName;
        } elseif ($request->filled('pdf_library_path')) {
            $libraryPath = (string) $request->input('pdf_library_path');

            if ($this->mediaLibrary->validatePath($libraryPath, 'pdf')) {
                if ($existing?->pdf_path && $existing->pdf_path !== $libraryPath) {
                    $this->uploads->delete($existing->pdf_path);
                }

                $validated['pdf_path'] = $libraryPath;
                $validated['pdf_name'] = basename($libraryPath);
            }
        }

        return $validated;
    }

    protected function syncImages(
        StoreInfoCornerItemRequest|UpdateInfoCornerItemRequest $request,
        InfoCornerItem $item,
    ): void {
        $keepIds = collect($request->input('keep_image_ids', []))
            ->map(fn ($id) => (int) $id)
            ->filter()
            ->intersect($item->images()->pluck('id'))
            ->values();

        foreach ($item->images()->get() as $existingImage) {
            if ($keepIds->contains($existingImage->id)) {
                continue;
            }

            $this->uploads->delete($existingImage->image_path);
            $existingImage->delete();
        }

        $nextOrder = (int) $item->images()->max('sort_order') + 1;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $upload = $this->uploads->store(
                    $file,
                    'image',
                    config('uploads.directories.info_corner_image')
                );

                $item->images()->create([
                    'image_path' => $upload->path,
                    'sort_order' => $nextOrder++,
                ]);
            }
        }

        foreach ($request->input('image_library_paths', []) as $libraryPath) {
            $libraryPath = trim((string) $libraryPath);

            if ($libraryPath === '' || ! $this->mediaLibrary->validatePath($libraryPath, 'image')) {
                continue;
            }

            $item->images()->create([
                'image_path' => $libraryPath,
                'sort_order' => $nextOrder++,
            ]);
        }

        $primaryImage = $item->images()->orderBy('sort_order')->orderBy('id')->first();
        $item->update(['image_path' => $primaryImage?->image_path]);
    }

    protected function uniqueSlug(
        ?string $slug,
        string $title,
        ?int $ignoreId = null,
    ): string {
        $base = Str::slug($slug ?: $title);
        $candidate = $base;
        $suffix = 1;

        while (
            InfoCornerItem::query()
                ->where('slug', $candidate)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $base.'-'.$suffix;
            $suffix++;
        }

        return $candidate;
    }
}
