#!/usr/bin/env bash
# Copy faculty portraits from Laravel admin storage into the Next.js public folder.
# Run after uploading new photos in the admin panel.
set -euo pipefail

FRONTEND_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$FRONTEND_ROOT/.." && pwd)"
SRC="$REPO_ROOT/Backend/storage/app/public/faculty/photos"
DEST="$FRONTEND_ROOT/public/images/faculty"

if [[ ! -d "$SRC" ]]; then
  echo "Source not found: $SRC"
  echo "Run: cd Backend && php artisan storage:link"
  exit 1
fi

mkdir -p "$DEST"
cp -f "$SRC"/* "$DEST"/ 2>/dev/null || true
COUNT="$(find "$DEST" -maxdepth 1 -type f | wc -l | tr -d ' ')"
echo "Synced $COUNT faculty images to public/images/faculty/"
