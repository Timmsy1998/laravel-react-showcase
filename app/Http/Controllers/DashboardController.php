<?php

namespace App\Http\Controllers;

use App\Services\RealmDashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function __invoke(RealmDashboardService $dashboardService): Response
    {
        return Inertia::render('Dashboard', [
            ...$dashboardService->payload(),
        ]);
    }
}
