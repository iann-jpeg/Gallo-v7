#!/bin/bash
set -euo pipefail

echo "Running cPanel preparation script for backend-laravel"

# 1. Ensure composer is available
if ! command -v composer >/dev/null 2>&1; then
  echo "Composer not found in PATH. Attempting to use vendor/composer if present..."
else
  echo "Running composer install (no-dev)"
  composer install --no-dev --optimize-autoloader
fi

# 2. Ensure storage directories exist and have proper permissions
mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/app/uploads
chmod -R 0755 storage

# 3. If artisan exists, run migrations and storage link
if [ -f artisan ]; then
  echo "Detected artisan. Running key:generate, migrate (if DB configured), and storage:link"
  php artisan key:generate || true
  php artisan migrate --force || echo "migrate failed (check DB config)"
  php artisan storage:link || true
else
  echo "No artisan found. Ensure DB schema is created manually or run seed.php / import db_seed.sql"
fi

echo "cPanel preparation completed. Verify .env and database settings before running in production."
