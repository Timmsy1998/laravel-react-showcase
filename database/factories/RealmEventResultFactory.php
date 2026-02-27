<?php

namespace Database\Factories;

use App\Models\RealmEvent;
use App\Models\RealmEventResult;
use App\Models\RealmGuild;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RealmEventResult>
 */
class RealmEventResultFactory extends Factory
{
    protected $model = RealmEventResult::class;

    public function definition(): array
    {
        return [
            'realm_event_id' => RealmEvent::factory(),
            'realm_guild_id' => RealmGuild::factory(),
            'score' => $this->faker->numberBetween(120, 1200),
            'wins' => $this->faker->numberBetween(0, 20),
            'kills' => $this->faker->numberBetween(5, 140),
        ];
    }
}
