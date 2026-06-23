#!/usr/bin/env bash
# Build a production zip of Backend/ for manual FTP upload to Hostinger.
# Usage: bash Backend/scripts/package-for-hostinger.sh
# Output: tmp/Backend-hostinger.zip
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ADMIN_DIR="$REPO_ROOT/Backend"
OUT_DIR="$REPO_ROOT/tmp"
ZIP_PATH="$OUT_DIR/Backend-hostinger.zip"
STAGING="$OUT_DIR/Backend"

echo "==> Installing Composer dependencies (production)..."
cd "$ADMIN_DIR"
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

echo "==> Staging files..."
rm -rf "$STAGING"
mkdir -p "$STAGING" "$OUT_DIR"

rsync -a \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.env.backup' \
  --exclude='.env.production' \
  --exclude='tests' \
  --exclude='.phpunit.cache' \
  --exclude='.phpunit.result.cache' \
  --exclude='.idea' \
  --exclude='.vscode' \
  --exclude='.DS_Store' \
  --exclude='database/database.sqlite' \
  --exclude='html-frontend' \
  --exclude='docker-compose.yml' \
  --exclude='Dockerfile' \
  "$ADMIN_DIR/" "$STAGING/"

echo "==> Creating zip..."
rm -f "$ZIP_PATH"
(cd "$OUT_DIR" && zip -rq "$(basename "$ZIP_PATH")" "$(basename "$STAGING")")
rm -rf "$STAGING"

SIZE="$(du -h "$ZIP_PATH" | cut -f1)"
echo ""
echo "Package ready: $ZIP_PATH ($SIZE)"
echo ""
echo "Upload steps:"
echo "  1. hPanel → File Manager → admin subdomain public_html"
echo "  2. Upload and extract Backend-hostinger.zip"
echo "  3. Set document root to .../public_html/Backend/public"
echo "     (FTP_SERVER_DIR should be the folder containing artisan)"
echo "  4. SSH/Terminal: cd .../Backend && bash scripts/post-deploy-hostinger.sh"
echo "  5. Edit .env with hPanel MySQL credentials before re-running step 4 if prompted"
