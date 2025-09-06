Galloways backend PHP scaffold (Lumen-based)

This is a minimal Lumen scaffold that reproduces key `/api/admin/*` endpoints for cPanel deployment using PostgreSQL.

Quick start (on your development machine):

1. Install PHP 8.1+, Composer.
2. From this folder run:

   composer install
   cp .env.example .env
   # configure .env with your Postgres connection

3. Run the app locally:

   php -S localhost:8000 -t public

4. Example curl:

   curl http://localhost:8000/api/admin/dashboard/comprehensive

Deploying to cPanel (high level):

- Upload the folder to your cPanel account (zip + upload or git deployment).
- Ensure PHP 8.1+ is selected in cPanel.
- Run `composer install` in your account (via SSH or cPanel terminal) to install dependencies.
- Set environment variables in `.env` and set the document root to `public/`.
- Run migrations (if you add them) via `php artisan migrate`.

Notes:
- This scaffold uses Lumen for a small footprint; you can upgrade to full Laravel if you need more features.
- I implemented only a subset of endpoints to get started: dashboard, users, activities, notifications, quotes, diaspora.
- Next steps: add migrations for claims/quotes/consultations, implement Eloquent models, add JWT auth.
