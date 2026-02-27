<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('realm:tick', function () {
    $result = app(\App\Services\RealmSimulationService::class)->tick();

    $this->info(
        sprintf(
            'Realm tick complete. events=%d results=%d guilds=%d',
            $result['events_updated'],
            $result['results_updated'],
            $result['guilds'],
        )
    );
})->purpose('Advance mocked realm activity and invalidate dashboard cache');

Schedule::command('realm:tick')->everyMinute()->withoutOverlapping();
