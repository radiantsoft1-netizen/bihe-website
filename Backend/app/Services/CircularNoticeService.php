<?php

namespace App\Services;

use App\Http\Requests\Admin\StoreCircularNoticeRequest;
use App\Http\Requests\Admin\UpdateCircularNoticeRequest;
use App\Models\CircularNotice;
use App\Support\MediaUploadResolver;
use App\Support\UniqueSlug;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CircularNoticeService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private RichHtmlSanitizer $richHtml,
        private MediaUploadResolver $mediaUploads,
    ) {
    }

    public function paginateForIndex(int $perPage = 15): LengthAwarePaginator
    {
        return CircularNotice::query()
            ->select(['id', 'title', 'slug', 'published_date', 'published', 'sort_order'])
            ->orderByDesc('published_date')
            ->orderBy('sort_order')
            ->paginate($perPage);
    }

    public function create(StoreCircularNoticeRequest $request): CircularNotice
    {
        $notice = new CircularNotice($this->prepareAttributes($request));
        $notice->save();

        return $notice;
    }

    public function update(UpdateCircularNoticeRequest $request, CircularNotice $circularNotice): CircularNotice
    {
        $circularNotice->fill($this->prepareAttributes($request, $circularNotice));
        $circularNotice->save();

        return $circularNotice;
    }

    public function delete(CircularNotice $circularNotice): void
    {
        $this->uploads->delete($circularNotice->image_path);
        $this->uploads->delete($circularNotice->pdf_path);
        $circularNotice->delete();
    }

    protected function prepareAttributes(
        StoreCircularNoticeRequest|UpdateCircularNoticeRequest $request,
        ?CircularNotice $existing = null,
    ): array {
        $validated = $request->validated();

        $validated['slug'] = UniqueSlug::forModel(
            CircularNotice::class,
            $validated['slug'] ?? null,
            $validated['title'],
            $existing?->id
        );
        $validated['published'] = $request->boolean('published');
        $validated = $this->richHtml->cleanFields($validated, ['excerpt', 'body']);
        unset($validated['image'], $validated['pdf'], $validated['image_library_path'], $validated['pdf_library_path']);

        $imagePath = $this->mediaUploads->resolveImage(
            $request,
            'image',
            'image_library_path',
            $existing?->image_path,
            config('uploads.directories.circular_notice_image'),
        );

        if ($imagePath) {
            $validated['image_path'] = $imagePath;
        }

        $pdf = $this->mediaUploads->resolvePdf(
            $request,
            'pdf',
            'pdf_library_path',
            $existing?->pdf_path,
            config('uploads.directories.circular_notice_pdf'),
        );

        if ($pdf) {
            $validated['pdf_path'] = $pdf['path'];
            $validated['pdf_name'] = $pdf['name'];
        }

        return $validated;
    }
}
