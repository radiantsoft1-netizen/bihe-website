#!/usr/bin/env bash
# Package Next.js public website for Vercel / Node deploy (not static HTML).
# Usage: bash scripts/package-frontend-for-deploy.sh
# Output: tmp/bihe-website-frontend.zip
set -euo pipefail

FRONTEND_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$FRONTEND_ROOT/.." && pwd)"
OUT_DIR="$REPO_ROOT/tmp"
ZIP_PATH="$OUT_DIR/bihe-website-frontend.zip"
STAGING="$OUT_DIR/bihe-website-frontend"

echo "==> Staging frontend source..."
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
  --exclude='.env.vercel.production' \
  --exclude='.DS_Store' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='*.zip' \
  "$FRONTEND_ROOT/" "$STAGING/"

# Production env template for Vercel / server
cat > "$STAGING/.env.production.example" <<'EOF'
# Vercel → Project → Settings → Environment Variables (Production)
ADMIN_ORIGIN=https://admin.bihedvg.org
NEXT_PUBLIC_API_URL=https://admin.bihedvg.org
REVALIDATE_SECRET=bihe-revalidate-2026
EOF

cat > "$STAGING/DEPLOY-FRONTEND.md" <<'EOF'
# BIHE public website — deploy package

Next.js 15 app (SSR + API routes). **Deploy to Vercel** (recommended), not Hostinger static hosting.

## Option A — Vercel (recommended)

1. Upload zip to GitHub OR import folder in Vercel dashboard
2. Framework: **Next.js** (auto-detected)
3. Set environment variables (Production):
   - `ADMIN_ORIGIN=https://admin.bihedvg.org`
   - `NEXT_PUBLIC_API_URL=https://admin.bihedvg.org`
   - `REVALIDATE_SECRET` (same as Laravel `.env`)
4. Deploy

## Option B — Vercel CLI (Mac)

```bash
npm install
npm run build
npx vercel --prod
```

## Option C — Node server (VPS with Node 20+)

```bash
npm ci
npm run build
ADMIN_ORIGIN=https://admin.bihedvg.org NEXT_PUBLIC_API_URL=https://admin.bihedvg.org npm start
```

## After deploy

- Homepage: https://bihedvg.org
- Faculty/API content loads from https://admin.bihedvg.org
- Faculty photos: `/storage/*` proxied via ADMIN_ORIGIN

## Do NOT upload to Hostinger as plain PHP/HTML

This site needs Node.js (Vercel or VPS). Admin stays on Hostinger at admin.bihedvg.org.
EOF

echo "==> Creating zip..."
rm -f "$ZIP_PATH"
(cd "$OUT_DIR" && zip -rq "$(basename "$ZIP_PATH")" "$(basename "$STAGING")")
rm -rf "$STAGING"

SIZE="$(du -h "$ZIP_PATH" | cut -f1)"
echo ""
echo "Frontend package ready: $ZIP_PATH ($SIZE)"
echo "See DEPLOY-FRONTEND.md inside the zip for Vercel steps."
