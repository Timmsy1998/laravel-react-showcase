<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RealmEventResult extends Model
{
    /** @use HasFactory<\Database\Factories\RealmEventResultFactory> */
    use HasFactory;

    protected $fillable = [
        'realm_event_id',
        'realm_guild_id',
        'score',
        'wins',
        'kills',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(RealmEvent::class, 'realm_event_id');
    }

    public function guild(): BelongsTo
    {
        return $this->belongsTo(RealmGuild::class, 'realm_guild_id');
    }
}
