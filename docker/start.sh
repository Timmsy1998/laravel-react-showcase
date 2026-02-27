#!/usr/bin/env sh
set -eu

if [ "${DB_CONNECTION:-}" = "sqlite" ]; then
  mkdir -p "$(dirname "${DB_DATABASE:-/data/database.sqlite}")"
  touch "${DB_DATABASE:-/data/database.sqlite}"
fi

php artisan migrate --force

if [ "${SEED_ON_DEPLOY:-true}" = "true" ]; then
  php artisan db:seed --force
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache

if [ "${ENABLE_SCHEDULER:-true}" = "true" ]; then
  php artisan schedule:work >/tmp/scheduler.log 2>&1 &
fi

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
