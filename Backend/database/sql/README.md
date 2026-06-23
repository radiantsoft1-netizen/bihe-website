# Manual database / superadmin options (Hostinger)

Prefer **migrations + seeders** on the server:

```bash
php artisan migrate --force --seed
```

Superadmin only (after roles exist):

```bash
php artisan db:seed --class=AdminUserSeeder --force
```

Credentials are read from `.env`:

- `ADMIN_USERNAME` (default `superadmin`)
- `ADMIN_EMAIL` (default `admin@bihedvg.org`)
- `ADMIN_PASSWORD` (set a strong value before seeding)

## phpMyAdmin import (alternative)

1. Create empty MySQL database in hPanel.
2. Generate dump locally: `php scripts/export-mysql-dump.php`
3. Import `tmp/final-deliverables/bihe-database-mysql.sql` in phpMyAdmin.
4. Update `users.password` for superadmin if needed via:

```bash
php artisan tinker --execute="\\App\\Models\\User::where('email', env('ADMIN_EMAIL'))->update(['password' => bcrypt('YOUR_NEW_PASSWORD')]);"
```

Raw SQL inserts for `users` are discouraged (bcrypt hash + Spatie `model_has_roles` must stay in sync). Use seeders instead.
