#!/usr/bin/env bash
# Package Next.js source for Hostinger Node.js Web App (bihedvg.org).
# Usage: bash scripts/package-hostinger-frontend.sh
# Output: tmp/bihe-website-hostinger.zip
set -euo pipefail

FRONTEND_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$FRONTEND_ROOT/.." && pwd)"
OUT_DIR="$REPO_ROOT/tmp"
ZIP_PATH="$OUT_DIR/bihe-website-hostinger.zip"
STAGING="$OUT_DIR/bihe-website-hostinger"

echo "==> Staging Hostinger Node.js frontend..."
rm -rf "$STAGING"
mkdir -p "$STAGING" "$OUT_DIR"

rsync -a \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.next-build' \
  --exclude='tmp' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='.DS_Store' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='*.zip' \
  "$FRONTEND_ROOT/" "$STAGING/"

cp "$REPO_ROOT/tmp/HOSTINGER-FRONTEND-DEPLOY.md" "$STAGING/HOSTINGER-FRONTEND-DEPLOY.md" 2>/dev/null || \
  cp "$REPO_ROOT/HOSTINGER-FRONTEND-DEPLOY.md" "$STAGING/" 2>/dev/null || true

cat > "$STAGING/.env.production" <<'EOF'
ADMIN_ORIGIN=https://admin.bihedvg.org
NEXT_PUBLIC_API_URL=https://admin.bihedvg.org
REVALIDATE_SECRET=bihe-revalidate-2026
EOF

cat > "$STAGING/.env.production.example" <<'EOF'
ADMIN_ORIGIN=https://admin.bihedvg.org
NEXT_PUBLIC_API_URL=https://admin.bihedvg.org
REVALIDATE_SECRET=bihe-revalidate-2026
NODE_ENV=production
EOF

echo "==> Creating zip (no node_modules — Hostinger runs npm ci)..."
rm -f "$ZIP_PATH"
(cd "$OUT_DIR" && zip -rq "$(basename "$ZIP_PATH")" "$(basename "$STAGING")")
rm -rf "$STAGING"

SIZE="$(du -h "$ZIP_PATH" | cut -f1)"
echo ""
echo "Hostinger frontend package: $ZIP_PATH ($SIZE)"
echo ""
echo "hPanel → Add Website → Node.js Web App → bihedvg.org"
echo "Build:  npm run build:hostinger"
echo "Start:  npm run start:hostinger"
echo "See HOSTINGER-FRONTEND-DEPLOY.md inside the zip."
