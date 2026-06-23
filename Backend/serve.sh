#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

# Load dev-server and mail settings from .env
if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source <(grep -E '^(MAIL_DELIVERY|BIHE_SERVE_HOST|BIHE_SERVE_PORT)=' "$ROOT/.env" || true)
  set +a
fi

bash "$ROOT/scripts/ensure-mailpit.sh"

# Recreate broken storage symlink after repo moves (bihe-admin → Backend).
EXPECTED_STORAGE="$(cd "$ROOT/storage/app/public" && pwd)"
CURRENT_STORAGE="$(readlink "$ROOT/public/storage" 2>/dev/null || true)"
if [[ "$CURRENT_STORAGE" != "$EXPECTED_STORAGE" ]]; then
  rm -f "$ROOT/public/storage"
  php "$ROOT/artisan" storage:link --no-interaction 2>/dev/null || true
fi

# Stop a stale dev server that may have been started without upload limits.
if lsof -ti:8099 >/dev/null 2>&1; then
  lsof -ti:8099 | xargs kill 2>/dev/null || true
  sleep 1
fi

SERVER_ROUTER="$ROOT/vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php"
SERVE_HOST="${BIHE_SERVE_HOST:-127.0.0.1}"
SERVE_PORT="${BIHE_SERVE_PORT:-8099}"

# artisan serve spawns `php -S` without -d/-c flags, so run the built-in server
# directly with project php.ini (20 MB uploads).
cd "$ROOT/public"
echo "BIHE Admin dev server: http://${SERVE_HOST}:${SERVE_PORT}/admin"

if [[ "$SERVE_HOST" == "0.0.0.0" ]]; then
  LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}')"
  if [[ -n "$LAN_IP" ]]; then
    echo "Other devices on the same Wi‑Fi: http://${LAN_IP}:${SERVE_PORT}/admin"
  fi
  echo "Set BIHE_SERVE_HOST=127.0.0.1 in .env to restrict to this computer only."
fi

exec php -c "$ROOT/php.ini" -d upload_max_filesize=20M -d post_max_size=22M \
  -S "${SERVE_HOST}:${SERVE_PORT}" \
  "$SERVER_ROUTER"
