#!/usr/bin/env bash
# Temporary admin bridge: local Laravel → Cloudflare tunnel → Vercel /admin
# Requires: brew install cloudflared, Laravel on :8099 (cd Backend && composer serve)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${BIHE_ADMIN_PORT:-8099}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "Install cloudflared: brew install cloudflared"
  exit 1
fi

if ! curl -fsS "http://127.0.0.1:${PORT}/admin" >/dev/null 2>&1; then
  echo "Start Laravel first: cd Backend && composer serve"
  exit 1
fi

echo "Opening tunnel to http://127.0.0.1:${PORT}"
echo "Copy the https://*.trycloudflare.com URL into Vercel ADMIN_ORIGIN + NEXT_PUBLIC_API_URL, then redeploy."
exec cloudflared tunnel --url "http://127.0.0.1:${PORT}"
