#!/usr/bin/env bash
# Quick integration check: Laravel API + Next.js revalidation (local dev).
set -euo pipefail

FRONTEND_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$FRONTEND_ROOT/.." && pwd)"
ADMIN_URL="${ADMIN_URL:-http://127.0.0.1:8099}"
SITE_URL="${SITE_URL:-http://127.0.0.1:3000}"
SECRET="${REVALIDATE_SECRET:-bihe-local-revalidate}"

if [[ -f "$REPO_ROOT/Backend/.env" ]]; then
  # shellcheck disable=SC1091
  source <(grep -E '^(REVALIDATE_SECRET|NEXTJS_URL)=' "$REPO_ROOT/Backend/.env" | sed 's/^/export /')
  SECRET="${REVALIDATE_SECRET:-$SECRET}"
  SITE_URL="${NEXTJS_URL:-$SITE_URL}"
fi

pass=0
fail=0

check() {
  local name="$1"
  local code="$2"
  if [[ "$code" =~ ^2 ]]; then
    echo "  OK   $name ($code)"
    pass=$((pass + 1))
  else
    echo "  FAIL $name ($code)"
    fail=$((fail + 1))
  fi
}

echo "[verify-backend] Admin API at $ADMIN_URL"
for path in \
  /api/v1/hero-banners \
  /api/v1/announcements \
  /api/v1/faculty \
  /api/v1/news \
  /api/v1/gallery \
  /api/v1/navigation \
  /api/v1/info-corner/items \
  /api/v1/circular-notices \
  /api/v1/governing-bodies \
  /api/v1/alumni-profiles \
  /api/v1/placement-drives \
  /api/v1/site-settings/prospectus; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$ADMIN_URL$path" || echo "000")
  check "$path" "$code"
done

echo "[verify-backend] Next.js site at $SITE_URL"
code=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/" || echo "000")
check "homepage" "$code"

echo "[verify-backend] Revalidation at $SITE_URL/api/revalidate"
rev=$(curl -s -X POST "$SITE_URL/api/revalidate" \
  -H 'Content-Type: application/json' \
  -d "{\"secret\":\"$SECRET\",\"paths\":[\"/\"],\"tags\":[\"api:/api/v1/faculty\"]}" || true)
if echo "$rev" | grep -q '"revalidated":true'; then
  echo "  OK   revalidate endpoint"
  pass=$((pass + 1))
else
  echo "  FAIL revalidate endpoint: $rev"
  fail=$((fail + 1))
fi

echo "[verify-backend] CKEditor assets"
for asset in \
  /assets/vendor/ckeditor4/ckeditor.js \
  /assets/vendor/ckeditor4/config.js; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$ADMIN_URL$asset" || echo "000")
  check "$asset" "$code"
done

photo_url=$(curl -s "$ADMIN_URL/api/v1/faculty" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data'][0].get('photo') or '')" 2>/dev/null || true)
if [[ -n "$photo_url" ]]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" "$photo_url" || echo "000")
  check "faculty photo URL" "$code"
fi

echo
if [[ "$fail" -eq 0 ]]; then
  echo "[verify-backend] All $pass checks passed."
  exit 0
fi

echo "[verify-backend] $fail check(s) failed, $pass passed."
echo "Start servers: npm run dev (website) and cd Backend && composer serve (admin)."
exit 1
