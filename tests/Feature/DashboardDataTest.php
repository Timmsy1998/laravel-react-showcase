<?php

namespace Tests\Feature;

use App\Models\RealmEvent;
use App\Models\RealmEventResult;
use App\Models\RealmGuild;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardDataTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_receives_backend_showcase_payload(): void
    {
        $user = User::factory()->create();
        $guild = RealmGuild::factory()->create();
        $event = RealmEvent::factory()->create([
            'status' => 'live',
            'current_players' => 88,
            'max_players' => 128,
            'reward_xp' => 4500,
            'starts_at' => now(),
        ]);

        RealmEventResult::factory()->create([
            'realm_event_id' => $event->id,
            'realm_guild_id' => $guild->id,
            'score' => 840,
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Dashboard')
                ->has('stats', 4)
                ->has('activity')
                ->has('topGuilds')
                ->has('progress', 3)
                ->where('activity.0.players', 88)
        );
    }
}
