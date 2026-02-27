<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RealmGuild extends Model
{
    /** @use HasFactory<\Database\Factories\RealmGuildFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'tag',
        'region',
        'active_members',
        'ranking_score',
    ];

    public function eventResults(): HasMany
    {
        return $this->hasMany(RealmEventResult::class);
    }
}
