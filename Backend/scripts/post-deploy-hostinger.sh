#!/usr/bin/env bash
# Run on Hostinger after first FTP/SFTP deploy (SSH or hPanel Terminal).
# Usage: cd /path/to/admin && bash scripts/post-deploy-hostinger.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# shellcheck source=hostinger-resolve-php.sh
source "$(dirname "$0")/hostinger-resolve-php.sh"

echo "==> Using PHP: $PHP_BIN ($("$PHP_BIN" -v | head -1))"

if [[ ! -f artisan ]]; then
  echo "Error: artisan not found. Run this from the Laravel project root (folder containing artisan)." >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  if [[ -f .env.production.example ]]; then
    cp .env.production.example .env
    echo "Created .env from .env.production.example"
    echo "Edit DB_DATABASE, DB_USERNAME, DB_PASSWORD from hPanel → Databases → MySQL"
    echo "Then re-run: bash scripts/post-deploy-hostinger.sh"
    exit 0
  fi
  cp .env.example .env
  echo "Created .env from .env.example — edit production values, then re-run."
  exit 0
fi

if grep -q 'u123456789_bihe' .env 2>/dev/null; then
  echo "ERROR: .env still has placeholder DB user u123456789_bihe"
  echo "Open hPanel → Databases → MySQL and set real DB_DATABASE / DB_USERNAME / DB_PASSWORD in .env"
  exit 1
fi

if ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
  "$PHP_BIN" artisan key:generate --force
fi

echo "==> Ensuring storage directories are writable..."
mkdir -p storage/framework/{cache/data,sessions,views} storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

echo "==> Running migrations..."
"$PHP_BIN" artisan config:clear
"$PHP_BIN" artisan migrate --force

echo "==> Seeding roles, superadmin, and demo content..."
"$PHP_BIN" artisan db:seed --force

echo "==> Linking public/storage..."
bash scripts/ensure-public-storage.sh

echo "==> Caching config, routes, views..."
"$PHP_BIN" artisan config:cache
"$PHP_BIN" artisan route:cache
"$PHP_BIN" artisan view:cache

echo "==> Testing website cache revalidation..."
if ! "$PHP_BIN" artisan website:test-revalidation; then
  echo "WARNING: Revalidation failed. In .env set NEXTJS_URL=https://bihedvg.org,"
  echo "REVALIDATE_SECRET matching the Node app, and if CDN blocks POSTs:"
  echo "WEBSITE_REVALIDATE_URL=http://127.0.0.1:<node-port-from-hpanel>"
fi

echo ""
echo "Done. Verify:"
echo "  - https://admin.bihedvg.org/up"
echo "  - https://admin.bihedvg.org/admin"
echo "  - https://admin.bihedvg.org/api/v1/announcements"
echo ""
echo "Superadmin login:"
grep -E '^ADMIN_USERNAME=' .env || true
