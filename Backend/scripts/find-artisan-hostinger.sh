#!/usr/bin/env bash
# Print all Laravel roots (artisan paths) on Hostinger — run from your Mac.
#
#   export BIHE_SSH_HOST="193.202.44.89"
#   export BIHE_SSH_PORT="65002"
#   bash Backend/scripts/find-artisan-hostinger.sh
set -euo pipefail

SSH_USER="${BIHE_SSH_USER:-u537632881}"
SSH_HOST="${BIHE_SSH_HOST:-}"
SSH_PORT="${BIHE_SSH_PORT:-65002}"

if [[ -z "$SSH_HOST" ]]; then
  echo "export BIHE_SSH_HOST=193.202.44.89" >&2
  exit 1
fi

echo "Searching for artisan on ${SSH_USER}@${SSH_HOST}..."
ssh -p "$SSH_PORT" "${SSH_USER}@${SSH_HOST}" \
  'find "$HOME" -name artisan -type f 2>/dev/null' \
  | while read -r f; do
    dir="$(dirname "$f")"
    echo ""
    echo "artisan: $f"
    echo "  export BIHE_REMOTE_DIR=\"$dir\""
  done
