<?php

namespace Tests\Feature;

use App\Models\RealmEvent;
use App\Models\RealmGuild;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class RealmTickCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_realm_tick_command_generates_and_updates_mocked_state(): void
    {
        Cache::put('dashboard:realm:payload:v1', ['stale' => true], now()->addMinutes(10));

        $exitCode = Artisan::call('realm:tick');

        $this->assertSame(0, $exitCode);
        $this->assertGreaterThan(0, RealmGuild::query()->count());
        $this->assertGreaterThan(0, RealmEvent::query()->count());
        $this->assertFalse(Cache::has('dashboard:realm:payload:v1'));
    }
}
