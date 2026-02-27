<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('realm_event_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('realm_event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('realm_guild_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('score')->default(0);
            $table->unsignedSmallInteger('wins')->default(0);
            $table->unsignedSmallInteger('kills')->default(0);
            $table->timestamps();

            $table->unique(['realm_event_id', 'realm_guild_id']);
            $table->index(['realm_guild_id', 'score']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('realm_event_results');
    }
};
