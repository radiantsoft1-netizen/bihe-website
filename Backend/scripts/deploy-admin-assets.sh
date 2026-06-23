#!/usr/bin/env bash
# Quick update: views + public/assets + app code (no composer, no migrate).
#
#   export BIHE_SSH_HOST="193.202.44.89"
#   export BIHE_SSH_PORT="65002"
#   bash Backend/scripts/deploy-admin-assets.sh
#
# If auto-detect fails, find the path on server:
#   ssh -p 65002 u537632881@193.202.44.89 'find "$HOME" -name artisan 2>/dev/null'
# Then: export BIHE_REMOTE_DIR="path/without/artisan"
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ADMIN_DIR="$REPO_ROOT/Backend"
SSH_USER="${BIHE_SSH_USER:-u537632881}"
SSH_HOST="${BIHE_SSH_HOST:-}"
SSH_PORT="${BIHE_SSH_PORT:-65002}"
REMOTE_DIR="${BIHE_REMOTE_DIR:-}"
PHP_REMOTE='/opt/alt/php85/usr/bin/php'
# Default Laravel root for admin.bihedvg.org on this Hostinger account:
DEFAULT_REMOTE_DIR="/home/${SSH_USER}/domains/bihedvg.org/public_html/admin"
SSH_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
SSH_MUX=(-o ControlMaster=auto -o "ControlPath=${HOME}/.ssh/bihe-deploy-%r@%h:%p" -o ControlPersist=300)

if [[ -z "$SSH_HOST" ]]; then
  echo "Set BIHE_SSH_HOST from hPanel → Advanced → SSH Access." >&2
  exit 1
fi

REMOTE="${SSH_USER}@${SSH_HOST}"

ssh_cmd() {
  ssh "${SSH_OPTS[@]}" "${SSH_MUX[@]}" "$REMOTE" "$@"
}

test_artisan_at() {
  local dir="$1"
  ssh_cmd "test -f \"${dir}/artisan\""
}

resolve_remote_dir() {
  # Explicit path from user (absolute or relative to $HOME)
  if [[ -n "$REMOTE_DIR" ]]; then
    if test_artisan_at "$REMOTE_DIR"; then
      echo "$REMOTE_DIR"
      return 0
    fi
    if test_artisan_at "\${HOME}/${REMOTE_DIR}"; then
      ssh_cmd "cd \"\${HOME}/${REMOTE_DIR}\" && pwd"
      return 0
    fi
    echo "ERROR: artisan not found at BIHE_REMOTE_DIR=${REMOTE_DIR}" >&2
    return 1
  fi

  echo "==> Searching for artisan on server..." >&2
  local all found preferred
  all="$(ssh_cmd 'find "$HOME" -name artisan -type f 2>/dev/null' || true)"
  if [[ -z "$all" ]]; then
    echo "ERROR: No artisan found under \$HOME." >&2
    return 1
  fi

  echo "$all" | while read -r f; do echo "    $f" >&2; done

  preferred="$(echo "$all" | grep -i 'bihedvg.org/public_html/admin' | head -1 || true)"
  if [[ -z "$preferred" ]]; then
    preferred="$(echo "$all" | grep -i 'admin\.bihedvg' | head -1 || true)"
  fi
  if [[ -z "$preferred" ]]; then
    preferred="$(echo "$all" | grep -i 'bihedvg' | head -1 || true)"
  fi
  if [[ -z "$preferred" ]]; then
    if test_artisan_at "$DEFAULT_REMOTE_DIR"; then
      echo "$DEFAULT_REMOTE_DIR"
      return 0
    fi
    preferred="$(echo "$all" | head -1)"
  fi

  dirname "$preferred"
}

REMOTE_DIR="$(resolve_remote_dir)"
echo "==> Laravel root: ${REMOTE_DIR}"

echo "==> Uploading resources, public/assets, app (tar over SSH)..."
cd "$ADMIN_DIR"
COPYFILE_DISABLE=1 tar czf - resources public/assets app config/website.php \
  | ssh_cmd "cd \"${REMOTE_DIR}\" && tar xzf - 2>/dev/null"

echo "==> Clearing Laravel caches..."
ssh_cmd "cd \"${REMOTE_DIR}\" && ${PHP_REMOTE} artisan view:clear && ${PHP_REMOTE} artisan config:clear && ${PHP_REMOTE} artisan view:cache && ${PHP_REMOTE} artisan config:cache"

echo "==> Linking public/storage (if needed)..."
ssh_cmd "cd \"${REMOTE_DIR}\" && ${PHP_REMOTE} artisan storage:link 2>/dev/null || true"

echo "==> Verifying admin.css..."
if ssh_cmd "grep -q 'min-height: 14rem' \"${REMOTE_DIR}/public/assets/css/admin.css\" && grep -q 'height: 10rem !important' \"${REMOTE_DIR}/public/assets/css/admin.css\""; then
  echo "OK: CSS editor fixes present on server."
else
  echo "WARNING: CSS fix not detected. Check path or upload." >&2
  ssh_cmd "ls -la \"${REMOTE_DIR}/public/assets/css/admin.css\" 2>&1 || true"
  exit 1
fi

echo "==> Verifying CKEditor base path fix..."
if ssh_cmd "grep -q \"CKEDITOR.basePath = window.CKEDITOR_BASEPATH\" \"${REMOTE_DIR}/resources/views/components/rich-text-assets.blade.php\""; then
  echo "OK: CKEditor basePath fix present on server."
else
  echo "WARNING: CKEditor basePath fix missing in rich-text-assets.blade.php" >&2
  exit 1
fi

echo "==> Verifying CKEditor toolbar CSS..."
if ssh_cmd "grep -q 'display: block !important' \"${REMOTE_DIR}/public/assets/css/admin.css\" && ! grep -q '.info-corner-form__section--editor .cke_top {\\n  display: none !important;' \"${REMOTE_DIR}/public/assets/css/admin.css\""; then
  echo "OK: CKEditor toolbar visible in admin.css."
else
  echo "WARNING: CKEditor toolbar may still be hidden in admin.css" >&2
fi

echo "Done. Hard-refresh https://admin.bihedvg.org/admin (Cmd+Shift+R)."
