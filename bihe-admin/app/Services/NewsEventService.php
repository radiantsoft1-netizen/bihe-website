<?php

namespace App\Services;

use App\Http\Requests\Admin\StoreNewsEventRequest;
use App\Http\Requests\Admin\UpdateNewsEventRequest;
use App\Models\NewsCategory;
use App\Models\NewsEvent;
use App\Support\MediaUploadResolver;
use App\Support\UniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class NewsEventService
{
    public function __construct(
        private NewsSeoService $seo,
        private SecureFileUploadService $uploads,
        private RichHtmlSanitizer $richHtml,
        private MediaUploadResolver $mediaUploads,
    ) {
    }

    public function paginateForIndex(int $perPage = 15): LengthAwarePaginator
    {
        return NewsEvent::query()
            ->select([
                'id',
                'news_category_id',
                'title',
                'event_date',
                'published',
                'is_featured',
                'show_in_ticker',
            ])
            ->with('category:id,name')
            ->orderByDesc('event_date')
            ->orderBy('sort_order')
            ->paginate($perPage);
    }

    public function activeCategories(): Collection
    {
        return NewsCategory::active()->orderBy('sort_order')->orderBy('name')->get();
    }

    public function create(StoreNewsEventRequest $request): NewsEvent
    {
        $newsEvent = new NewsEvent($this->prepareAttributes($request));
        $this->seo->apply($newsEvent);
        $newsEvent->save();

        return $newsEvent;
    }

    public function update(UpdateNewsEventRequest $request, NewsEvent $newsEvent): NewsEvent
    {
        $newsEvent->fill($this->prepareAttributes($request, $newsEvent));
        $this->seo->apply($newsEvent);
        $newsEvent->save();

        return $newsEvent;
    }

    public function delete(NewsEvent $newsEvent): void
    {
        $this->uploads->delete($newsEvent->image_path);
        $this->uploads->delete($newsEvent->pdf_path);
        $newsEvent->delete();
    }

    protected function prepareAttributes(StoreNewsEventRequest|UpdateNewsEventRequest $request, ?NewsEvent $existing = null): array
    {
        $validated = $request->validated();

        $validated['slug'] = UniqueSlug::forModel(
            NewsEvent::class,
            $validated['slug'] ?? null,
            $validated['title'],
            $existing?->id
        );
        $validated['published'] = $request->boolean('published');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['show_in_ticker'] = $request->boolean('show_in_ticker');
        $validated['news_category_id'] = $validated['news_category_id'] ?? null;
        if (isset($validated['body'])) {
            $validated['body'] = $this->richHtml->clean($validated['body']);
        }

        $validated = $this->richHtml->cleanFields($validated, ['summary', 'seo_description']);
        unset($validated['image'], $validated['pdf'], $validated['image_library_path'], $validated['pdf_library_path']);

        $imagePath = $this->mediaUploads->resolveImage(
            $request,
            'image',
            'image_library_path',
            $existing?->image_path,
            config('uploads.directories.news_image'),
        );

        if ($imagePath) {
            $validated['image_path'] = $imagePath;
        }

        $pdf = $this->mediaUploads->resolvePdf(
            $request,
            'pdf',
            'pdf_library_path',
            $existing?->pdf_path,
            config('uploads.directories.news_pdf'),
        );

        if ($pdf) {
            $validated['pdf_path'] = $pdf['path'];
            $validated['pdf_name'] = $pdf['name'];
        }

        return $validated;
    }
}
