#!/usr/bin/env bash
# Deploy Backend to Hostinger over SSH (rsync + remote artisan).
#
# Prerequisites:
#   - SSH access to Hostinger (hPanel → Advanced → SSH Access)
#   - Composer installed locally
#   - Existing .env on server (never overwritten)
#
# Usage:
#   export BIHE_SSH_HOST="in-mum-web1110.hostingersite.com"   # from hPanel SSH details
#   export BIHE_SSH_USER="u537632881"
#   export BIHE_REMOTE_DIR="public_html/admin"
#   bash Backend/scripts/deploy-ssh-hostinger.sh
#
# Or one line:
#   BIHE_SSH_HOST=your-host BIHE_SSH_USER=u537632881 bash Backend/scripts/deploy-ssh-hostinger.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ADMIN_DIR="$REPO_ROOT/Backend"
SSH_USER="${BIHE_SSH_USER:-u537632881}"
SSH_HOST="${BIHE_SSH_HOST:-}"
REMOTE_DIR="${BIHE_REMOTE_DIR:-public_html/admin}"
PHP_REMOTE='/opt/alt/php85/usr/bin/php'

if [[ -z "$SSH_HOST" ]]; then
  echo "Set BIHE_SSH_HOST (SSH hostname from hPanel → SSH Access)." >&2
  echo "Example: export BIHE_SSH_HOST=in-mum-web1110.hostingersite.com" >&2
  exit 1
fi

REMOTE="${SSH_USER}@${SSH_HOST}"
RSYNC_TARGET="${REMOTE}:${REMOTE_DIR}/"

echo "==> Installing Composer dependencies (production)..."
cd "$ADMIN_DIR"
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

echo "==> Syncing to ${RSYNC_TARGET} ..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='tests' \
  --exclude='.phpunit.cache' \
  --exclude='.phpunit.result.cache' \
  --exclude='database/database.sqlite' \
  --exclude='storage/logs/*' \
  --exclude='storage/framework/cache/data/*' \
  --exclude='storage/framework/sessions/*' \
  --exclude='storage/framework/views/*' \
  --exclude='docker-compose.yml' \
  --exclude='Dockerfile' \
  --exclude='html-frontend' \
  "$ADMIN_DIR/" "$RSYNC_TARGET"

echo "==> Running post-deploy on server..."
ssh "$REMOTE" "cd ${REMOTE_DIR} && PHP_BIN=${PHP_REMOTE} bash scripts/post-deploy-hostinger.sh"

echo ""
echo "Admin deploy complete: https://admin.bihedvg.org/admin"
