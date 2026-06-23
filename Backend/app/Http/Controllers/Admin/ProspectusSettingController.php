<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProspectusSettingRequest;
use App\Services\ProspectusSettingService;
use App\Services\WebsiteRevalidationService;

class ProspectusSettingController extends Controller
{
    public function __construct(
        private ProspectusSettingService $prospectus,
        private WebsiteRevalidationService $revalidation,
    ) {
    }

    public function edit()
    {
        $setting = $this->prospectus->get();

        return view('admin.settings.prospectus', compact('setting'));
    }

    public function update(UpdateProspectusSettingRequest $request)
    {
        $this->prospectus->update($request);
        $this->revalidation->revalidateForResource('prospectus-settings');

        return redirect()
            ->route('admin.settings.prospectus.edit')
            ->with('success', 'Prospectus settings saved successfully.');
    }
}
