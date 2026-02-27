<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('database.default') === 'sqlite') {
            $sqlitePath = config('database.connections.sqlite.database');

            if (is_string($sqlitePath) && $sqlitePath !== '' && $sqlitePath !== ':memory:') {
                File::ensureDirectoryExists(dirname($sqlitePath));

                if (! File::exists($sqlitePath)) {
                    File::put($sqlitePath, '');
                }
            }
        }

        if ($this->app->isProduction()) {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
    }
}
