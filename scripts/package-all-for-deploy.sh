#!/usr/bin/env bash
# Build production-ready deploy folders + zips for Hostinger (admin + public site).
# Usage: bash scripts/package-all-for-deploy.sh
# Output:
#   tmp/deploy/Backend/          — Laravel admin (composer --no-dev)
#   tmp/deploy/Frontend/         — Next.js (built + production env templates)
#   tmp/deploy/Backend-hostinger.zip
#   tmp/deploy/Frontend-hostinger.zip
#   tmp/deploy/README-DEPLOY.md
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_DIR="$REPO_ROOT/Backend"
FRONTEND_DIR="$REPO_ROOT/Frontend"
DEPLOY_DIR="$REPO_ROOT/tmp/deploy"
BACKEND_STAGE="$DEPLOY_DIR/Backend"
FRONTEND_STAGE="$DEPLOY_DIR/Frontend"
BACKEND_ZIP="$DEPLOY_DIR/Backend-hostinger.zip"
FRONTEND_ZIP="$DEPLOY_DIR/Frontend-hostinger.zip"

echo "==> BIHE deploy packager"
echo "    Repo: $REPO_ROOT"
echo "    Out:  $DEPLOY_DIR"
echo ""

mkdir -p "$DEPLOY_DIR"

# ── Backend (Laravel) ─────────────────────────────────────────────────────────
echo "==> [1/4] Backend — composer install (production)..."
cd "$BACKEND_DIR"
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

echo "==> [2/4] Backend — staging..."
rm -rf "$BACKEND_STAGE"
mkdir -p "$BACKEND_STAGE"

rsync -a \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.env.backup' \
  --exclude='.env.local' \
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
  "$BACKEND_DIR/" "$BACKEND_STAGE/"

cat > "$BACKEND_STAGE/DEPLOY-BACKEND.md" <<'EOF'
# BIHE Backend — Hostinger deploy

## Upload
1. Upload **Backend-hostinger.zip** to your admin subdomain folder (e.g. `public_html/admin`).
2. Extract so `artisan` is at `.../admin/artisan` (or rename folder to match your FTP path).
3. **Document root** in hPanel must point to `.../admin/public` (not the Laravel root).

## First-time server setup
```bash
cd /path/to/admin
cp .env.production.example .env
# Edit .env: DB_*, APP_KEY (or run artisan key:generate), MAIL_*, NEXTJS_URL, REVALIDATE_SECRET
bash scripts/post-deploy-hostinger.sh
```

## After code updates (keep existing .env)
```bash
cd /path/to/admin
bash scripts/post-deploy-hostinger.sh
```

## Verify
- https://admin.bihedvg.org/up
- https://admin.bihedvg.org/admin
- https://admin.bihedvg.org/api/v1/announcements

## Important env vars
- `APP_URL=https://admin.bihedvg.org`
- `NEXTJS_URL=https://bihedvg.org`
- `REVALIDATE_SECRET` — must match Frontend `.env`
EOF

# ── Frontend (Next.js) ────────────────────────────────────────────────────────
echo "==> [3/4] Frontend — install deps + production build..."
cd "$FRONTEND_DIR"

if [[ ! -d node_modules ]]; then
  npm ci
else
  npm ci
fi

export ADMIN_ORIGIN="${ADMIN_ORIGIN:-https://admin.bihedvg.org}"
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://admin.bihedvg.org}"
export REVALIDATE_SECRET="${REVALIDATE_SECRET:-bihe-revalidate-2026}"
export NODE_ENV=production

npm run build:hostinger

echo "==> [4/4] Frontend — staging..."
rm -rf "$FRONTEND_STAGE"
mkdir -p "$FRONTEND_STAGE"

rsync -a \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='tmp' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.vercel.production' \
  --exclude='.DS_Store' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='*.zip' \
  "$FRONTEND_DIR/" "$FRONTEND_STAGE/"

cat > "$FRONTEND_STAGE/.env.production" <<EOF
ADMIN_ORIGIN=${ADMIN_ORIGIN}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
REVALIDATE_SECRET=${REVALIDATE_SECRET}
NODE_ENV=production
EOF

cp "$FRONTEND_STAGE/.env.production" "$FRONTEND_STAGE/.env.production.example"

cat > "$FRONTEND_STAGE/DEPLOY-FRONTEND.md" <<'EOF'
# BIHE Frontend — Hostinger Node.js deploy

Production build is included (`.next/` folder). Hostinger still needs `npm ci` for runtime dependencies.

## hPanel → Node.js Web App (bihedvg.org)
| Setting | Value |
|---------|--------|
| Application root | folder containing this `package.json` |
| Node version | 20.x |
| Install | `npm ci --omit=dev` |
| Build | *(skip if `.next` already present)* `npm run build:hostinger` |
| Start | `npm run start:hostinger` |

## Environment variables (hPanel → Node.js → Environment)
```
ADMIN_ORIGIN=https://admin.bihedvg.org
NEXT_PUBLIC_API_URL=https://admin.bihedvg.org
REVALIDATE_SECRET=bihe-revalidate-2026
NODE_ENV=production
```

## Vercel alternative
Set project **Root Directory** to `Frontend`, same env vars, deploy from Git.

## Verify
- https://bihedvg.org
- https://bihedvg.org/academics/faculty-and-staff
- Admin changes appear after save (revalidation)
EOF

# ── Zips ───────────────────────────────────────────────────────────────────────
echo "==> Creating zip archives..."
rm -f "$BACKEND_ZIP" "$FRONTEND_ZIP"
(cd "$DEPLOY_DIR" && zip -rq "$(basename "$BACKEND_ZIP")" Backend)
(cd "$DEPLOY_DIR" && zip -rq "$(basename "$FRONTEND_ZIP")" Frontend)

cat > "$DEPLOY_DIR/README-DEPLOY.md" <<'EOF'
# BIHE — ready-to-deploy packages

Generated by `bash scripts/package-all-for-deploy.sh`.

| Package | Folder | Zip | Target |
|---------|--------|-----|--------|
| **Admin + API** | `Backend/` | `Backend-hostinger.zip` | Hostinger PHP — `admin.bihedvg.org` |
| **Public website** | `Frontend/` | `Frontend-hostinger.zip` | Hostinger Node.js or Vercel — `bihedvg.org` |

## Quick steps

### 1. Backend (admin)
1. Upload `Backend-hostinger.zip` → extract on server.
2. Point document root to `public/` inside Laravel.
3. `cp .env.production.example .env` → edit DB credentials.
4. `bash scripts/post-deploy-hostinger.sh`

See `Backend/DEPLOY-BACKEND.md`.

### 2. Frontend (website)
1. Upload `Frontend-hostinger.zip` → extract for Node.js app root.
2. Set env vars in hPanel (see `Frontend/.env.production`).
3. `npm ci --omit=dev` then `npm run start:hostinger`

See `Frontend/DEPLOY-FRONTEND.md`.

## Secrets checklist
- [ ] MySQL password in Backend `.env`
- [ ] `REVALIDATE_SECRET` matches in Backend + Frontend
- [ ] `NEXTJS_URL=https://bihedvg.org` in Backend `.env`
- [ ] `php artisan storage:link` (post-deploy script runs this)

## Do not upload
- `.env` with real secrets inside zips (templates only)
- `node_modules/` (install on server)
EOF

BACKEND_SIZE="$(du -sh "$BACKEND_STAGE" | cut -f1)"
FRONTEND_SIZE="$(du -sh "$FRONTEND_STAGE" | cut -f1)"
BACKEND_ZIP_SIZE="$(du -h "$BACKEND_ZIP" | cut -f1)"
FRONTEND_ZIP_SIZE="$(du -h "$FRONTEND_ZIP" | cut -f1)"

echo ""
echo "════════════════════════════════════════════════════════"
echo "  Deploy packages ready"
echo "════════════════════════════════════════════════════════"
echo ""
echo "  Folder:  $DEPLOY_DIR"
echo ""
echo "  Backend/              ($BACKEND_SIZE)"
echo "  Backend-hostinger.zip   ($BACKEND_ZIP_SIZE)"
echo "  Frontend/             ($FRONTEND_SIZE)"
echo "  Frontend-hostinger.zip ($FRONTEND_ZIP_SIZE)"
echo ""
echo "  Read: $DEPLOY_DIR/README-DEPLOY.md"
echo ""
