#!/usr/bin/env bash
# Ensure uploaded files are web-accessible at /storage/* (symlink or copy fallback).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# shellcheck source=hostinger-resolve-php.sh
source "$(dirname "$0")/hostinger-resolve-php.sh"

PUBLIC_LINK="$ROOT/public/storage"
UPLOADS_DIR="$ROOT/storage/app/public"

mkdir -p "$UPLOADS_DIR"

if "$PHP_BIN" artisan storage:link 2>/dev/null; then
  echo "==> storage:link OK"
  exit 0
fi

echo "==> storage:link failed — copying storage/app/public → public/storage"

if [[ -L "$PUBLIC_LINK" ]]; then
  rm "$PUBLIC_LINK"
fi

mkdir -p "$PUBLIC_LINK"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$UPLOADS_DIR/" "$PUBLIC_LINK/"
else
  cp -a "$UPLOADS_DIR/." "$PUBLIC_LINK/"
fi

echo "==> public/storage mirror ready"
