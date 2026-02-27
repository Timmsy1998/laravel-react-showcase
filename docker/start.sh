#!/usr/bin/env sh
set -eu

if [ "${DB_CONNECTION:-}" = "sqlite" ]; then
  mkdir -p "$(dirname "${DB_DATABASE:-/data/database.sqlite}")"
  touch "${DB_DATABASE:-/data/database.sqlite}"
fi

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
