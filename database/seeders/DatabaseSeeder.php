<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['username' => 'testuser', 'password' => 'password']
        );

        if (\App\Models\RealmGuild::query()->count() === 0) {
            $this->call(RealmShowcaseSeeder::class);
        }

        Cache::forget('dashboard:realm:payload:v1');
    }
}
