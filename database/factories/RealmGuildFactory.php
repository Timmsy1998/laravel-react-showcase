<?php

namespace Database\Factories;

use App\Models\RealmGuild;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RealmGuild>
 */
class RealmGuildFactory extends Factory
{
    protected $model = RealmGuild::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company().' Guild',
            'tag' => strtoupper($this->faker->unique()->lexify('???')),
            'region' => $this->faker->randomElement(['NA', 'EU', 'APAC', 'LATAM']),
            'active_members' => $this->faker->numberBetween(8, 60),
            'ranking_score' => $this->faker->numberBetween(900, 2400),
        ];
    }
}
