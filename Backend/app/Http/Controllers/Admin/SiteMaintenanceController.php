<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteMaintenanceRequest;
use App\Services\SiteMaintenanceService;
use App\Services\WebsiteRevalidationService;

class SiteMaintenanceController extends Controller
{
    public function __construct(
        private SiteMaintenanceService $maintenance,
        private WebsiteRevalidationService $revalidation,
    ) {
    }

    public function edit()
    {
        $setting = $this->maintenance->get();

        return view('admin.settings.site-maintenance', compact('setting'));
    }

    public function update(UpdateSiteMaintenanceRequest $request)
    {
        $this->maintenance->update($request);
        $this->revalidation->revalidateForResource('site-maintenance');

        return redirect()
            ->route('admin.settings.site-maintenance.edit')
            ->with('success', 'Website maintenance settings saved successfully.');
    }
}
