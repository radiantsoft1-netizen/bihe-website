<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Http\Requests\Admin\StoreRecruitingPartnerRequest;
use App\Http\Requests\Admin\UpdateRecruitingPartnerRequest;
use App\Models\RecruitingPartner;
use App\Support\AdminPagination;
use Illuminate\Http\Request;
use App\Support\MediaUploadResolver;
use App\Services\SecureFileUploadService;

class RecruitingPartnerController extends Controller
{
    use BulkDestroysRecords;

    public function __construct(
        private SecureFileUploadService $uploads,
        private MediaUploadResolver $mediaUploads,
    ) {
    }

    public function index(Request $request)
    {
        $recruitingPartners = AdminPagination::paginate(
            RecruitingPartner::query()->orderBy('sort_order')->orderBy('id'),
            $request,
            15,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.recruiting-partners.index', compact('recruitingPartners', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.recruiting-partners.create');
    }

    public function store(StoreRecruitingPartnerRequest $request)
    {
        $validated = $request->validated();
        $validated['active'] = $request->boolean('active');
        unset($validated['logo'], $validated['logo_library_path']);

        $logoPath = $this->mediaUploads->resolveImage(
            $request,
            'logo',
            'logo_library_path',
            null,
            config('uploads.directories.recruiting_partner'),
        );

        if ($logoPath) {
            $validated['logo_path'] = $logoPath;
        }

        RecruitingPartner::create($validated);

        return redirect()->route('admin.recruiting-partners.index')
            ->with('success', 'Recruiting partner created successfully.');
    }

    public function edit(RecruitingPartner $recruitingPartner)
    {
        return view('admin.recruiting-partners.edit', compact('recruitingPartner'));
    }

    public function update(UpdateRecruitingPartnerRequest $request, RecruitingPartner $recruitingPartner)
    {
        $validated = $request->validated();
        $validated['active'] = $request->boolean('active');
        unset($validated['logo'], $validated['logo_library_path']);

        $logoPath = $this->mediaUploads->resolveImage(
            $request,
            'logo',
            'logo_library_path',
            $recruitingPartner->logo_path,
            config('uploads.directories.recruiting_partner'),
        );

        if ($logoPath) {
            $validated['logo_path'] = $logoPath;
        }

        $recruitingPartner->update($validated);

        return redirect()->route('admin.recruiting-partners.index')
            ->with('success', 'Recruiting partner updated successfully.');
    }

    public function destroy(RecruitingPartner $recruitingPartner)
    {
        $this->uploads->delete($recruitingPartner->logo_path);
        $recruitingPartner->delete();

        return redirect()->route('admin.recruiting-partners.index')
            ->with('success', 'Recruiting partner deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            RecruitingPartner::class,
            'admin.recruiting-partners.index',
            function (RecruitingPartner $recruitingPartner): void {
                $this->uploads->delete($recruitingPartner->logo_path);
                $recruitingPartner->delete();
            },
        );
    }
}
