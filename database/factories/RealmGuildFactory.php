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
            'name' => fake()->unique()->company().' Guild',
            'tag' => strtoupper(fake()->unique()->lexify('???')),
            'region' => fake()->randomElement(['NA', 'EU', 'APAC', 'LATAM']),
            'active_members' => fake()->numberBetween(8, 60),
            'ranking_score' => fake()->numberBetween(900, 2400),
        ];
    }
}
