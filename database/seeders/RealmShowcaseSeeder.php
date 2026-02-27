<?php

namespace Database\Seeders;

use App\Models\RealmEvent;
use App\Models\RealmEventResult;
use App\Models\RealmGuild;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class RealmShowcaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $guilds = RealmGuild::factory()->count(10)->create();
        $events = RealmEvent::factory()->count(12)->create();

        foreach ($events as $event) {
            $eventGuilds = $guilds->random(random_int(4, 7));

            foreach ($eventGuilds as $guild) {
                RealmEventResult::factory()->create([
                    'realm_event_id' => $event->id,
                    'realm_guild_id' => $guild->id,
                ]);
            }
        }

        Cache::forget('dashboard:realm:payload:v1');
    }
}
