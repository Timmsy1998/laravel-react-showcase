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
        $status = $this->faker->randomElement(['queued', 'scheduled', 'live', 'completed']);
        $startsAt = $this->faker->dateTimeBetween('-7 days', '+7 days');
        $endsAt = $status === 'completed'
            ? $this->faker->dateTimeBetween($startsAt, '+10 days')
            : null;

        return [
            'title' => $this->faker->randomElement([
                'Arena Clash',
                'Guild Skirmish',
                'Raid Rotation',
                'Control Point Cup',
                'Nightfall Trials',
            ]).' #'.$this->faker->numberBetween(10, 999),
            'status' => $status,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'current_players' => $this->faker->numberBetween(0, 220),
            'max_players' => $this->faker->randomElement([64, 100, 128, 256]),
            'reward_xp' => $this->faker->numberBetween(1000, 15000),
        ];
    }
}
