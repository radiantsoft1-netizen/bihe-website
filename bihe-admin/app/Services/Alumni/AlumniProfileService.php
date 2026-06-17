<?php

namespace App\Services\Alumni;

use App\Http\Requests\Admin\StoreAlumniProfileRequest;
use App\Http\Requests\Admin\UpdateAlumniProfileRequest;
use App\Http\Requests\Api\RegisterAlumniProfileRequest;
use App\Models\AlumniProfile;
use App\Services\MediaLibraryService;
use App\Services\RichHtmlSanitizer;
use App\Services\SecureFileUploadService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class AlumniProfileService
{
    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaLibraryService $mediaLibrary,
        private RichHtmlSanitizer $richHtml,
    ) {
    }

    public function paginateForIndex(
        ?string $approvalStatus = null,
        ?string $program = null,
        ?string $search = null,
        int $perPage = 15,
    ): LengthAwarePaginator {
        $query = AlumniProfile::query()
            ->orderBy('sort_order')
            ->orderByDesc('passout_year')
            ->orderByDesc('batch_year')
            ->orderBy('name');

        if ($approvalStatus !== null && $approvalStatus !== '') {
            $query->where('approval_status', $approvalStatus);
        }

        if ($program !== null && $program !== '') {
            $query->where('program', $program);
        }

        if ($search !== null && $search !== '') {
            $term = '%'.$search.'%';
            $query->where(function ($builder) use ($term) {
                $builder
                    ->where('name', 'like', $term)
                    ->orWhere('email', 'like', $term)
                    ->orWhere('phone', 'like', $term)
                    ->orWhere('current_employer', 'like', $term)
                    ->orWhere('current_role', 'like', $term);
            });
        }

        return $query->paginate($perPage);
    }

    public function create(StoreAlumniProfileRequest $request): AlumniProfile
    {
        $attributes = $this->prepareAdminAttributes($request);
        $profile = new AlumniProfile($attributes);
        $profile->slug = $this->uniqueSlug($request->input('slug'), $request->input('name'));
        $profile->source = 'admin';
        $profile->save();

        return $profile;
    }

    public function update(UpdateAlumniProfileRequest $request, AlumniProfile $profile): AlumniProfile
    {
        $attributes = $this->prepareAdminAttributes($request, $profile);
        $attributes['slug'] = $this->uniqueSlug(
            $request->input('slug'),
            $request->input('name'),
            $profile->id,
        );

        $profile->update($attributes);

        return $profile;
    }

    public function delete(AlumniProfile $profile): void
    {
        $this->uploads->delete($profile->photo_path);
        $profile->delete();
    }

    public function approve(AlumniProfile $profile): AlumniProfile
    {
        $profile->update([
            'approval_status' => 'approved',
            'published' => true,
            'approved_at' => now(),
            'rejection_note' => null,
        ]);

        return $profile;
    }

    public function reject(AlumniProfile $profile, ?string $note = null): AlumniProfile
    {
        $profile->update([
            'approval_status' => 'rejected',
            'published' => false,
            'rejection_note' => $note,
        ]);

        return $profile;
    }

    public function registerFromPublic(RegisterAlumniProfileRequest $request): AlumniProfile
    {
        $validated = $request->validated();
        $name = (string) $validated['name'];

        $profile = new AlumniProfile([
            'slug' => $this->uniqueSlug(null, $name),
            'name' => $name,
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'date_of_birth' => $validated['date_of_birth'] ?? null,
            'current_location' => $validated['current_location'] ?? null,
            'program' => $validated['program'],
            'class_section' => $validated['class_section'] ?? null,
            'admission_year' => $validated['admission_year'] ?? null,
            'passout_year' => $validated['passout_year'],
            'batch_year' => $validated['passout_year'],
            'register_number' => $validated['register_number'] ?? null,
            'current_role' => $validated['current_role'] ?? null,
            'current_employer' => $validated['current_employer'] ?? null,
            'current_status' => $validated['current_status'] ?? null,
            'willing_to_mentor' => $request->willingToMentor(),
            'bio' => $validated['bio'] ?? null,
            'linkedin_url' => $validated['linkedin_url'] ?? null,
            'published' => false,
            'approval_status' => 'pending',
            'source' => 'registration',
            'tracking_id' => $this->uniqueTrackingId($name),
            'notification_channel' => 'email',
            'submitted_at' => now(),
            'sort_order' => (int) (AlumniProfile::query()->max('sort_order') ?? 0) + 1,
        ]);

        if ($request->hasFile('photo')) {
            $upload = $this->uploads->store(
                $request->file('photo'),
                'image',
                config('uploads.directories.alumni_photo'),
            );
            $profile->photo_path = $upload->path;
        }

        $profile->save();

        return $profile;
    }

    public function updateSortOrder(AlumniProfile $profile, int $sortOrder): AlumniProfile
    {
        $profile->update(['sort_order' => $sortOrder]);

        return $profile;
    }

    /** @param list<array{id: int, sort_order: int}> $orders */
    public function updateSortOrders(array $orders): void
    {
        foreach ($orders as $order) {
            AlumniProfile::query()
                ->whereKey($order['id'])
                ->update(['sort_order' => $order['sort_order']]);
        }
    }

    protected function prepareAdminAttributes(
        StoreAlumniProfileRequest|UpdateAlumniProfileRequest $request,
        ?AlumniProfile $existing = null,
    ): array {
        $validated = $request->validated();

        unset(
            $validated['photo'],
            $validated['photo_library_path'],
        );

        $validated['published'] = $request->boolean('published', $existing?->published ?? true);
        $validated['is_featured'] = $request->boolean('is_featured', $existing?->is_featured ?? false);
        $validated['willing_to_mentor'] = $request->boolean('willing_to_mentor', $existing?->willing_to_mentor ?? false);

        if (! empty($validated['passout_year'])) {
            $validated['batch_year'] = $validated['passout_year'];
        }

        if ($existing === null) {
            $validated['approval_status'] = $validated['approval_status'] ?? 'approved';
            $validated['source'] = 'admin';
            $validated['approved_at'] = $validated['approval_status'] === 'approved' ? now() : null;
        }

        $validated = $this->richHtml->cleanFields($validated, ['bio', 'testimonial']);

        if ($request->hasFile('photo')) {
            if ($existing?->photo_path) {
                $this->uploads->delete($existing->photo_path);
            }

            $upload = $this->uploads->store(
                $request->file('photo'),
                'image',
                config('uploads.directories.alumni_photo'),
            );
            $validated['photo_path'] = $upload->path;
        } elseif ($request->filled('photo_library_path')) {
            $libraryPath = (string) $request->input('photo_library_path');

            if ($this->mediaLibrary->validatePath($libraryPath, 'image')) {
                if ($existing?->photo_path && $existing->photo_path !== $libraryPath) {
                    $this->uploads->delete($existing->photo_path);
                }

                $validated['photo_path'] = $libraryPath;
            }
        }

        return $validated;
    }

    protected function uniqueSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        while (
            AlumniProfile::query()
                ->where('slug', $candidate)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $base.'-'.$suffix;
            $suffix++;
        }

        return $candidate;
    }

    protected function uniqueTrackingId(string $name): string
    {
        $prefix = $this->trackingNamePrefix($name);
        $number = $this->nextTrackingNumber();

        do {
            $candidate = $prefix.'BIHE#'.$this->formatTrackingNumber($number);
            $number++;
        } while (AlumniProfile::query()->where('tracking_id', $candidate)->exists());

        return $candidate;
    }

    protected function trackingNamePrefix(string $name): string
    {
        $normalized = preg_replace('/\s+/', ' ', trim($name)) ?? '';
        $firstName = explode(' ', $normalized)[0] ?? $normalized;
        $lettersOnly = preg_replace('/[^a-zA-Z]/', '', $firstName) ?? '';

        if ($lettersOnly === '') {
            return 'Alumni';
        }

        $short = Str::substr($lettersOnly, 0, 4);

        return ucfirst(Str::lower($short));
    }

    protected function nextTrackingNumber(): int
    {
        $max = 1413;

        AlumniProfile::query()
            ->whereNotNull('tracking_id')
            ->pluck('tracking_id')
            ->each(function (string $trackingId) use (&$max) {
                if (preg_match('/#(\d+)$/', $trackingId, $matches)) {
                    $max = max($max, (int) $matches[1]);
                }
            });

        return $max + 1;
    }

    protected function formatTrackingNumber(int $number): string
    {
        return str_pad((string) $number, 4, '0', STR_PAD_LEFT);
    }
}
