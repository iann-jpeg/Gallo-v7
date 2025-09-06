Deployment steps for cPanel

1. Upload the project folder to your cPanel account (via File Manager or git). Place it outside the public_html directory if you prefer, and set the Document Root to the `public/` directory.
2. SSH into your cPanel account or use the Terminal in cPanel.
3. Run: `composer install` to install dependencies.
4. Copy `.env.example` to `.env` and configure your PostgreSQL database details (host, port, database, username, password) provided by cPanel.
5. Ensure PHP version >= 8.1 is selected in cPanel's PHP Selector.
6. If migrations present, run: `php artisan migrate`.
7. Point your domain/subdomain to the `public/` folder or set an .htaccess redirect to `public/index.php`.
8. For background workers or queue, configure cPanel's cron or supervisor equivalent.

Notes about PostgreSQL on cPanel:
- cPanel commonly provides MySQL/MariaDB; if your host supports PostgreSQL, use the Postgres credentials. Otherwise you can switch DB driver to mysql and adapt `.env` accordingly.
- If you cannot run composer via SSH, generate `vendor/` locally and upload it along with the code.

Additional notes for PostgreSQL and cPanel

- Create the PostgreSQL database and user in cPanel's PostgreSQL Databases tool and assign the user to the db.
- Copy `.env.example` to `.env` and set `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_SCHEMA`, and `DB_SSLMODE` as required by your host.

Quick automation helper

If your cPanel account provides SSH with composer and PHP, run this helper from the project root:

```bash
bash deploy/prepare_for_cpanel.sh
```

MPESA callbacks and HTTPS

- MPESA requires a publicly reachable HTTPS callback URL. Set `MPESA_CALLBACK_URL` in `.env` to your production callback and ensure the domain has a valid TLS certificate.

Storage and file uploads

- Uploaded documents are stored in `storage/app/uploads`. Ensure `storage/` is writable by PHP. If `public` is mapped under `public_html/api`, ensure routing is set so `public/index.php` is the entry.

