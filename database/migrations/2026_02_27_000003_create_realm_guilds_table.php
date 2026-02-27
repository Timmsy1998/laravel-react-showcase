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
        Schema::create('realm_guilds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tag', 8)->unique();
            $table->string('region', 32)->index();
            $table->unsignedSmallInteger('active_members')->default(0);
            $table->unsignedInteger('ranking_score')->default(1000)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('realm_guilds');
    }
};
