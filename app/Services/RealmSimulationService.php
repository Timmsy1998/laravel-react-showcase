<?php

namespace App\Services;

use App\Models\RealmEvent;
use App\Models\RealmEventResult;
use App\Models\RealmGuild;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class RealmSimulationService
{
    public function tick(): array
    {
        $this->ensureBaselineData();

        $events = RealmEvent::query()->get();
        $guilds = RealmGuild::query()->get();

        $eventUpdates = 0;
        $resultUpdates = 0;

        DB::transaction(function () use ($events, $guilds, &$eventUpdates, &$resultUpdates): void {
            foreach ($events as $event) {
                $previousStatus = $event->status;
                $this->advanceEventState($event);
                $this->simulateParticipation($event);
                $event->save();

                if (
                    $event->isDirty(['status', 'current_players', 'reward_xp', 'starts_at', 'ends_at']) ||
                    $previousStatus !== $event->status
                ) {
                    $eventUpdates++;
                }

                $eventResults = $event->results()->get();

                if ($eventResults->isEmpty()) {
                    foreach ($guilds->random(random_int(3, min(6, $guilds->count()))) as $guild) {
                        RealmEventResult::query()->create([
                            'realm_event_id' => $event->id,
                            'realm_guild_id' => $guild->id,
                            'score' => random_int(100, 450),
                            'wins' => random_int(0, 5),
                            'kills' => random_int(5, 40),
                        ]);
                        $resultUpdates++;
                    }

                    continue;
                }

                foreach ($eventResults as $result) {
                    if ($event->status !== 'completed') {
                        $result->score = max(0, $result->score + random_int(-20, 95));
                        $result->wins = max(0, $result->wins + random_int(0, 2));
                        $result->kills = max(0, $result->kills + random_int(0, 12));
                        $result->save();
                        $resultUpdates++;
                    }
                }
            }

            foreach ($guilds as $guild) {
                $guild->active_members = max(8, min(80, $guild->active_members + random_int(-3, 3)));

                $scoreDelta = (int) RealmEventResult::query()
                    ->where('realm_guild_id', $guild->id)
                    ->orderByDesc('updated_at')
                    ->limit(5)
                    ->sum('wins');

                $guild->ranking_score = max(800, min(3000, $guild->ranking_score + random_int(-10, 20) + $scoreDelta));
                $guild->save();
            }
        });

        Cache::forget('dashboard:realm:payload:v1');

        return [
            'events_updated' => $eventUpdates,
            'results_updated' => $resultUpdates,
            'guilds' => RealmGuild::query()->count(),
            'events' => RealmEvent::query()->count(),
        ];
    }

    protected function ensureBaselineData(): void
    {
        if (RealmGuild::query()->count() === 0) {
            RealmGuild::factory()->count(8)->create();
        }

        if (RealmEvent::query()->count() === 0) {
            RealmEvent::factory()->count(10)->create();
        }
    }

    protected function advanceEventState(RealmEvent $event): void
    {
        $now = now();

        if ($event->status === 'queued' && random_int(1, 100) <= 40) {
            $event->status = 'scheduled';
            $event->starts_at = $now->copy()->addMinutes(random_int(5, 60));
            return;
        }

        if ($event->status === 'scheduled' && $event->starts_at && $event->starts_at->lte($now)) {
            $event->status = 'live';
            return;
        }

        if ($event->status === 'live' && random_int(1, 100) <= 20) {
            $event->status = 'completed';
            $event->ends_at = $now;
            return;
        }

        if ($event->status === 'completed' && random_int(1, 100) <= 15) {
            $event->status = 'queued';
            $event->starts_at = $now->copy()->addMinutes(random_int(20, 180));
            $event->ends_at = null;
        }
    }

    protected function simulateParticipation(RealmEvent $event): void
    {
        if ($event->status === 'live') {
            $event->current_players = max(
                0,
                min($event->max_players, $event->current_players + random_int(-12, 18))
            );
            $event->reward_xp += random_int(20, 220);
            return;
        }

        if (in_array($event->status, ['queued', 'scheduled'], true)) {
            $event->current_players = max(
                0,
                min($event->max_players, $event->current_players + random_int(-4, 8))
            );
        }
    }
}
