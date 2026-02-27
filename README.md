# Gaming Realm

Gaming Realm is a Laravel + React showcase app for competitive community platforms.

It demonstrates a modern Laravel backend with an Inertia React frontend, themed authenticated UI, backend-driven dashboard metrics, and Fly.io deployment with SQLite persistence.

## Current Features

- Username-based authentication
  - Register with `username`
  - Login is case-insensitive on username
- Full auth flows
  - Login, register, password reset, email verification
- Authenticated experience
  - Themed dashboard and profile pages
  - Profile update, password change, account deletion
- Backend showcase domain + metrics
  - Realm guilds, events, and event results domain models
  - Cached aggregate dashboard payload from Laravel service layer
  - Dashboard widgets rendered from backend data
  - Live mock simulation via scheduled `realm:tick` updates
  - Dashboard auto-refreshes to surface backend state changes
- Deployment + CI
  - Fly.io deploy config with persistent SQLite volume (`/data/database.sqlite`)
  - Startup script runs migrations, optional seeding, and optional scheduler worker
  - GitHub Actions pipeline gates deploy on passing tests

## Tech Stack

- PHP 8.2+
- Laravel 12
- React 18 + TypeScript
- Inertia.js
- Tailwind CSS
- Vite 7
- SQLite (default)

## Local Setup

1. Install dependencies:
```bash
composer install
npm install
```

2. Environment + key:
```bash
cp .env.example .env
php artisan key:generate
```

3. Migrate + seed:
```bash
php artisan migrate
php artisan db:seed
```

4. Start development:
```bash
npm run dev
```

Notes:
- `npm run dev` and `composer dev` both start the full local stack.
- `composer dev` runs Laravel server, queue worker, logs, and Vite concurrently.

## Seeded Showcase Data

This project includes mock showcase data for backend-powered dashboard widgets.

Seed commands:
```bash
php artisan db:seed
```

Reset + reseed:
```bash
php artisan migrate:fresh --seed
```

If seeded data does not appear immediately, clear cache:
```bash
php artisan cache:clear
```

## Live Mock Activity

To make mocked data behave more like live production telemetry:

- `realm:tick` command simulates event/guild/result changes
- Laravel scheduler runs `realm:tick` every minute
- Dashboard polls backend data every 30 seconds and updates widgets

Run a manual tick locally:
```bash
php artisan realm:tick
```

Run scheduler locally (optional if not using `schedule:work`):
```bash
php artisan schedule:work
```

## Tests and Build

Run tests:
```bash
php artisan test
```

Build frontend assets:
```bash
npm run build
```

## CI/CD (GitHub Actions + Fly)

Workflow:
- `.github/workflows/test-and-deploy.yml`
- Runs on `main` and `master`
- Executes tests first
- Deploys to Fly only if tests pass

Required GitHub secret:
- `FLY_API_TOKEN`

## Fly.io Deployment

`fly.toml` is configured for:
- app: `gaming-realm`
- region: `iad`
- SQLite path: `/data/database.sqlite`
- volume mount: `data -> /data`

### One-time setup

```bash
fly auth login
fly apps create gaming-realm
fly volumes create data -r iad -n 1 --app gaming-realm
fly secrets set APP_KEY="$(php artisan key:generate --show)" --app gaming-realm
```

### Deploy

```bash
fly deploy --app gaming-realm
```

### Runtime behavior

On Fly startup (`docker/start.sh`):
1. Ensures SQLite file path exists
2. Runs `php artisan migrate --force`
3. Runs `php artisan db:seed --force` by default
4. Caches config/routes/views
5. Starts `php artisan schedule:work` in background by default
6. Starts app server

Disable startup seeding if needed:
```bash
fly secrets set SEED_ON_DEPLOY=false --app gaming-realm
```

Disable scheduler worker if needed:
```bash
fly secrets set ENABLE_SCHEDULER=false --app gaming-realm
```

## License

MIT
