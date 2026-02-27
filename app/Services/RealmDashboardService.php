<?php

namespace App\Services;

use App\Models\RealmEvent;
use App\Models\RealmGuild;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class RealmDashboardService
{
    /**
     * Build the dashboard payload from backend aggregates.
     *
     * @return array<string, mixed>
     */
    public function payload(): array
    {
        return Cache::remember(
            'dashboard:realm:payload:v1',
            now()->addMinutes(5),
            fn () => $this->computePayload()
        );
    }

    /**
     * @return array<string, mixed>
     */
    protected function computePayload(): array
    {
        $now = now();
        $currentWeekStart = $now->copy()->startOfWeek();
        $previousWeekStart = $currentWeekStart->copy()->subWeek();
        $monthStart = $now->copy()->startOfMonth();

        $activeGuilds = RealmGuild::query()
            ->where('active_members', '>', 0)
            ->count();

        $openEvents = RealmEvent::query()
            ->whereIn('status', ['queued', 'scheduled', 'live'])
            ->count();

        $liveEvents = RealmEvent::query()
            ->where('status', 'live')
            ->count();

        $xpToday = (int) RealmEvent::query()
            ->whereDate('starts_at', $now->toDateString())
            ->sum('reward_xp');

        $currentWeekXp = (int) RealmEvent::query()
            ->whereBetween('starts_at', [$currentWeekStart, $now])
            ->sum('reward_xp');

        $previousWeekXp = (int) RealmEvent::query()
            ->whereBetween('starts_at', [$previousWeekStart, $currentWeekStart])
            ->sum('reward_xp');

        $weekDelta = $this->percentDelta($previousWeekXp, $currentWeekXp);

        $seasonEvents = RealmEvent::query()
            ->where('starts_at', '>=', $monthStart)
            ->count();

        $seasonCompletedEvents = RealmEvent::query()
            ->where('starts_at', '>=', $monthStart)
            ->where('status', 'completed')
            ->count();

        $seasonCompletion = $seasonEvents > 0
            ? (int) round(($seasonCompletedEvents / $seasonEvents) * 100)
            : 0;

        $participationRate = (int) round((float) RealmEvent::query()
            ->where('max_players', '>', 0)
            ->selectRaw('AVG((current_players * 100.0) / max_players) as avg_participation')
            ->value('avg_participation'));

        $balancedGuildCount = RealmGuild::query()
            ->whereBetween('ranking_score', [1200, 1800])
            ->count();

        $totalGuildCount = RealmGuild::query()->count();

        $competitiveBalance = $totalGuildCount > 0
            ? (int) round(($balancedGuildCount / $totalGuildCount) * 100)
            : 0;

        $topGuilds = RealmGuild::query()
            ->leftJoin('realm_event_results', 'realm_event_results.realm_guild_id', '=', 'realm_guilds.id')
            ->leftJoin('realm_events', function ($join) use ($now) {
                $join->on('realm_events.id', '=', 'realm_event_results.realm_event_id')
                    ->where('realm_events.starts_at', '>=', $now->copy()->subDays(30));
            })
            ->groupBy(
                'realm_guilds.id',
                'realm_guilds.name',
                'realm_guilds.tag',
                'realm_guilds.region',
                'realm_guilds.ranking_score'
            )
            ->select([
                'realm_guilds.name',
                'realm_guilds.tag',
                'realm_guilds.region',
                'realm_guilds.ranking_score',
            ])
            ->selectRaw('COALESCE(SUM(realm_event_results.score), 0) as total_score')
            ->orderByDesc('total_score')
            ->orderByDesc('realm_guilds.ranking_score')
            ->limit(5)
            ->get()
            ->map(fn ($guild) => [
                'name' => $guild->name,
                'tag' => $guild->tag,
                'region' => $guild->region,
                'score' => (int) $guild->total_score,
            ])
            ->values()
            ->all();

        $activity = RealmEvent::query()
            ->withCount('results')
            ->orderByRaw(
                "CASE status WHEN 'live' THEN 0 WHEN 'queued' THEN 1 WHEN 'scheduled' THEN 2 ELSE 3 END"
            )
            ->orderByDesc('starts_at')
            ->limit(5)
            ->get()
            ->map(fn (RealmEvent $event) => [
                'name' => $event->title,
                'state' => $this->stateLabel($event->status, $event->starts_at, $event->ends_at),
                'players' => (int) $event->current_players,
                'guilds' => (int) $event->results_count,
            ])
            ->values()
            ->all();

        return [
            'stats' => [
                ['label' => 'Active Guilds', 'value' => (string) $activeGuilds, 'delta' => '+'.$balancedGuildCount.' balanced'],
                ['label' => 'Open Events', 'value' => (string) $openEvents, 'delta' => (string) $liveEvents.' live'],
                ['label' => 'XP Awarded Today', 'value' => number_format($xpToday), 'delta' => $weekDelta],
                ['label' => 'Tracked Competitions', 'value' => (string) RealmEvent::query()->count(), 'delta' => 'Last 30d leaderboard'],
            ],
            'activity' => $activity,
            'topGuilds' => $topGuilds,
            'progress' => [
                ['label' => 'Season Completion', 'value' => $seasonCompletion],
                ['label' => 'Avg Participation', 'value' => min(100, $participationRate)],
                ['label' => 'Competitive Balance', 'value' => min(100, $competitiveBalance)],
            ],
            'updatedAt' => now()->toIso8601String(),
        ];
    }

    protected function percentDelta(int $previous, int $current): string
    {
        if ($previous <= 0) {
            return $current > 0 ? '+100%' : '0%';
        }

        $delta = (($current - $previous) / $previous) * 100;
        $rounded = (int) round($delta);

        return ($rounded >= 0 ? '+' : '').$rounded.'%';
    }

    protected function stateLabel(string $status, ?Carbon $startsAt, ?Carbon $endsAt): string
    {
        if ($status === 'live') {
            return 'Live';
        }

        if ($status === 'queued') {
            return 'Queueing';
        }

        if ($status === 'scheduled' && $startsAt) {
            return 'Starts '.$startsAt->diffForHumans(now(), short: true, parts: 2);
        }

        if ($status === 'completed' && $endsAt) {
            return 'Ended '.$endsAt->diffForHumans(now(), short: true, parts: 2);
        }

        return ucfirst($status);
    }
}
