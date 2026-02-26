# Gaming Realm

Gaming Realm is a showcase project I built to demonstrate a modern Laravel + React stack for community-driven gaming products.

It focuses on a clean full-stack baseline with authentication, profile management, and a styled landing experience that can be extended into tournaments, guild tools, and progression systems.

## What this project shows

- Laravel 12 backend with Inertia-powered React frontend
- Authentication flow: register, login, password reset, email verification
- Protected dashboard and authenticated profile management
- Profile update, password change, and account deletion flows
- Tailwind-based UI with a custom gaming-themed landing page
- Production-ready container and Fly.io deployment config

## Tech stack

- PHP 8.2+
- Laravel 12
- React 18 + TypeScript
- Inertia.js
- Tailwind CSS
- Vite
- SQLite by default (easy to swap to Postgres/MySQL)

## Local development

1. Install dependencies:
```bash
composer install
npm install
```

2. Set up environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Run migrations:
```bash
php artisan migrate
```

4. Start the app:
```bash
composer run dev
```

## Build and test

Build frontend assets:
```bash
npm run build
```

Run tests:
```bash
php artisan test
```

## Deployment (Fly.io)

This repo includes `Dockerfile`, `.dockerignore`, and `fly.toml`.

1. Authenticate and create app:
```bash
fly auth login
fly apps create gaming-realm
```

2. Create persistent volume (for SQLite):
```bash
fly volumes create data --region ord --size 1
```

3. Set app key:
```bash
fly secrets set APP_KEY="$(php artisan key:generate --show)"
```

4. Deploy:
```bash
fly deploy
```

Notes:

- Deploy runs migrations with `php artisan migrate --force` via Fly release command.
- Default database path on Fly is `/data/database.sqlite`.
- For Postgres/MySQL, set `DB_*` secrets and update Fly env values accordingly.

## Roadmap ideas

- Guild and team management
- Event and tournament scheduling
- Reward/loot progression
- Real-time notifications and activity feeds

## License

MIT
