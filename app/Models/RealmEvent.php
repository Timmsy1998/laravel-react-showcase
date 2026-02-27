<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RealmEvent extends Model
{
    /** @use HasFactory<\Database\Factories\RealmEventFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'status',
        'starts_at',
        'ends_at',
        'current_players',
        'max_players',
        'reward_xp',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function results(): HasMany
    {
        return $this->hasMany(RealmEventResult::class);
    }
}
