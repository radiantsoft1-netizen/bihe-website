<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AlumniProfile;
use App\Support\StoredFileUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlumniProfileController extends Controller
{
    private const LIST_COLUMNS = [
        'id',
        'slug',
        'name',
        'batch_year',
        'passout_year',
        'admission_year',
        'program',
        'class_section',
        'current_role',
        'current_employer',
        'current_location',
        'current_status',
        'willing_to_mentor',
        'bio',
        'testimonial',
        'photo_path',
        'linkedin_url',
        'is_featured',
        'published',
        'sort_order',
    ];

    public function index(Request $request): JsonResponse
    {
        $query = AlumniProfile::publicDirectory()
            ->select(self::LIST_COLUMNS)
            ->orderBy('sort_order')
            ->orderByDesc('batch_year')
            ->orderBy('name');

        if ($request->filled('program')) {
            $query->where('program', $request->string('program'));
        }

        if ($request->filled('batch_year') || $request->filled('passout_year')) {
            $year = (int) ($request->input('passout_year') ?? $request->input('batch_year'));
            $query->where(function ($builder) use ($year) {
                $builder->where('passout_year', $year)->orWhere('batch_year', $year);
            });
        }

        if ($request->filled('q')) {
            $term = '%'.$request->string('q').'%';
            $query->where(function ($builder) use ($term) {
                $builder
                    ->where('name', 'like', $term)
                    ->orWhere('current_role', 'like', $term)
                    ->orWhere('current_employer', 'like', $term)
                    ->orWhere('current_location', 'like', $term)
                    ->orWhere('program', 'like', $term);
            });
        }

        $data = $query->get()->map(fn (AlumniProfile $profile) => $this->transform($profile));

        return response()->json(['data' => $data]);
    }

    public function show(string $slug): JsonResponse
    {
        $profile = AlumniProfile::publicDirectory()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($profile, includeBody: true)]);
    }

    protected function transform(AlumniProfile $profile, bool $includeBody = false): array
    {
        $payload = [
            'id' => (string) $profile->id,
            'slug' => $profile->slug,
            'name' => $profile->name,
            'batchYear' => $profile->displayPassoutYear(),
            'passoutYear' => $profile->displayPassoutYear(),
            'admissionYear' => $profile->admission_year,
            'program' => $profile->program,
            'classSection' => $profile->class_section,
            'currentRole' => $profile->current_role,
            'currentEmployer' => $profile->current_employer,
            'currentLocation' => $profile->current_location,
            'currentStatus' => $profile->current_status,
            'willingToMentor' => $profile->willing_to_mentor,
            'photo' => StoredFileUrl::publicImage($profile->photo_path),
            'linkedinUrl' => $profile->linkedin_url,
            'isFeatured' => $profile->is_featured,
            'href' => '/alumni/'.$profile->slug,
            'published' => $profile->published,
            'sortOrder' => $profile->sort_order,
        ];

        if ($includeBody) {
            $payload['bio'] = $profile->bio;
            $payload['testimonial'] = $profile->testimonial;
            $payload['bioParagraphs'] = $this->paragraphsFromBody($profile->bio);
            $payload['testimonialParagraphs'] = $this->paragraphsFromBody($profile->testimonial);
        }

        return $payload;
    }

    /** @return list<string> */
    protected function paragraphsFromBody(?string $body): array
    {
        if (! $body) {
            return [];
        }

        return array_values(array_filter(array_map(
            static fn (string $paragraph) => trim($paragraph),
            preg_split("/\r\n\r\n|\n\n/", $body) ?: []
        )));
    }
}
