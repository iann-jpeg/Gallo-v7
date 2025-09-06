Same-domain deployment (cPanel) — frontend at galloways.co.ke and backend under /api

Overview
- Host the static frontend files in `public_html/` (this is the site root for galloways.co.ke).
- Host the Laravel/Lumen application in a sibling folder (recommended) such as `~/backend-laravel`.
- Copy the contents of `backend-laravel/public/` into `public_html/api/` and adjust the `index.php` to point to the real bootstrap and vendor paths in `~/backend-laravel`.

Why this layout
- cPanel exposes `public_html` as the web root. Placing the frontend there makes static hosting straightforward.
- Keeping the application code outside `public_html` is more secure; we only expose the public front-controller file under `/api`.

Steps (summary)
1. Upload your frontend `dist/` (from `frontend/`) into `public_html/`.
2. Upload the full `backend-laravel/` folder into your home directory (for example `~/backend-laravel`).
3. Copy the contents of `backend-laravel/public/` into `public_html/api/`.
4. Edit `public_html/api/index.php` so that it requires the correct vendor autoload and bootstrap files (see sample `public_html/api/index.php` provided).
5. Ensure PHP has required extensions and run `composer install` inside `backend-laravel` (via SSH) or upload a prebuilt `vendor/` folder.
6. Set the `backend-laravel/.env` values (Postgres connection, FRONTEND_URL=https://galloways.co.ke, ADMIN_EMAIL, MPESA/SMTP keys).
7. Run migrations (if you have SSH): `php artisan migrate --force`. If not, import `db_seed.sql` via phpPgAdmin or run `seed.php`.
8. Set permissions for `backend-laravel/storage` and `bootstrap/cache` so PHP can write logs and uploads.

Notes and common fixes
- Update file upload settings in php.ini (`upload_max_filesize`, `post_max_size`, `max_execution_time`) if uploads fail.
- If you serve the frontend from the same domain, set the frontend API var to a relative path in `frontend/.env`:
  VITE_API_BASE_URL="/api"
- Make sure `backend-laravel/.env` has `FRONTEND_URL=https://galloways.co.ke` to enable CORS and generate correct absolute links in emails.
- For storage access (user-uploaded documents) create a symlink or expose a protected files route rather than exposing full `storage/`.

Security
- Keep non-public code (models, config, vendor) outside `public_html`.
- Use HTTPS (configure SSL in cPanel) to avoid mixed-content and secure tokens.

If you'd like, I can prepare a small `public_html/api/index.php` and `.htaccess` for you to copy directly. They are included in this folder as samples.
