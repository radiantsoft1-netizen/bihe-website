<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function index(DashboardService $dashboard)
    {
        $data = $dashboard->build(auth()->user());

        return view('admin.dashboard', $data);
    }
}
