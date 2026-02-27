<?php

namespace Database\Factories;

use App\Models\RealmEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RealmEvent>
 */
class RealmEventFactory extends Factory
{
    protected $model = RealmEvent::class;

    public function definition(): array
    {
        $status = fake()->randomElement(['queued', 'scheduled', 'live', 'completed']);
        $startsAt = fake()->dateTimeBetween('-7 days', '+7 days');
        $endsAt = $status === 'completed'
            ? fake()->dateTimeBetween($startsAt, '+10 days')
            : null;

        return [
            'title' => fake()->randomElement([
                'Arena Clash',
                'Guild Skirmish',
                'Raid Rotation',
                'Control Point Cup',
                'Nightfall Trials',
            ]).' #'.fake()->numberBetween(10, 999),
            'status' => $status,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'current_players' => fake()->numberBetween(0, 220),
            'max_players' => fake()->randomElement([64, 100, 128, 256]),
            'reward_xp' => fake()->numberBetween(1000, 15000),
        ];
    }
}
