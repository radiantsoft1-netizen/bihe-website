#!/usr/bin/env bash
# Start Mailpit for local email capture when MAIL_DELIVERY is not "live".
set -euo pipefail

if [[ "${MAIL_DELIVERY:-capture}" == "live" ]]; then
  exit 0
fi

if lsof -ti:1025 >/dev/null 2>&1; then
  exit 0
fi

if ! command -v mailpit >/dev/null 2>&1; then
  echo "[mail] Mailpit is not installed. Run: brew install mailpit" >&2
  echo "[mail] Or set MAIL_DELIVERY=live in .env with real SMTP credentials." >&2
  exit 0
fi

LOG_FILE="${TMPDIR:-/tmp}/bihe-mailpit.log"
nohup mailpit --smtp "[::]:1025" --listen "[::]:8025" >"$LOG_FILE" 2>&1 &
sleep 1

if lsof -ti:1025 >/dev/null 2>&1; then
  echo "[mail] Mailpit running — view captured emails at http://127.0.0.1:8025"
else
  echo "[mail] Failed to start Mailpit. See $LOG_FILE" >&2
fi
