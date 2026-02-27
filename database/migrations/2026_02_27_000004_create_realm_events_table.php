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
        Schema::create('realm_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('status', 16)->index();
            $table->timestamp('starts_at')->nullable()->index();
            $table->timestamp('ends_at')->nullable()->index();
            $table->unsignedSmallInteger('current_players')->default(0);
            $table->unsignedSmallInteger('max_players')->default(100);
            $table->unsignedInteger('reward_xp')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('realm_events');
    }
};
