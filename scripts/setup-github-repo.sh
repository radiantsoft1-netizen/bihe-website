#!/usr/bin/env bash
# Create GitHub repo and push BIHE monorepo (Frontend + Backend).
# Usage:
#   bash scripts/setup-github-repo.sh
#   GITHUB_REPO=bihe-college-website bash scripts/setup-github-repo.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OWNER="${GITHUB_OWNER:-radiantsoft1-netizen}"
REPO="${GITHUB_REPO:-bihe-website}"
REMOTE="https://github.com/${OWNER}/${REPO}.git"
VISIBILITY="${GITHUB_VISIBILITY:-private}" # private | public

echo "==> BIHE GitHub setup"
echo "    Owner: ${OWNER}"
echo "    Repo:  ${REPO}"
echo ""

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "==> GitHub login required (browser will open)..."
  gh auth login -h github.com -p https -s repo,workflow,read:org -w
fi

echo "==> Authenticated as: $(gh api user -q .login)"

if gh repo view "${OWNER}/${REPO}" >/dev/null 2>&1; then
  echo "==> Repo exists: https://github.com/${OWNER}/${REPO}"
else
  echo "==> Creating repository ${OWNER}/${REPO} (${VISIBILITY})..."
  if [[ "$VISIBILITY" == "public" ]]; then
    gh repo create "${REPO}" --public --description "BIHE College — Next.js website + Laravel admin/API monorepo"
  else
    gh repo create "${REPO}" --private --description "BIHE College — Next.js website + Laravel admin/API monorepo"
  fi
fi

git remote set-url origin "$REMOTE"

echo "==> Staging changes..."
git add -A
git status --short | head -20
CHANGED="$(git status --porcelain | wc -l | tr -d ' ')"
if [[ "$CHANGED" == "0" ]]; then
  echo "Nothing to commit."
else
  echo "==> Committing ${CHANGED} changed paths..."
  git commit -m "$(cat <<'EOF'
chore: monorepo layout with Frontend/ and Backend/

Split Next.js public site (Frontend/) and Laravel admin/API (Backend/).
Update CI workflows, deploy scripts, and local dev paths.
EOF
)"
fi

echo "==> Pushing to origin main..."
git push -u origin main

echo ""
echo "════════════════════════════════════════════════════════"
echo "  Repository: https://github.com/${OWNER}/${REPO}"
echo "════════════════════════════════════════════════════════"
echo ""
echo "Add these GitHub Actions secrets (Settings → Secrets → Actions):"
echo "  FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_SERVER_DIR"
echo "  (optional SFTP) SFTP_HOST, SFTP_USER, SFTP_PASSWORD, SFTP_REMOTE_PATH"
echo ""
echo "Vercel: set Root Directory to Frontend"
echo "See docs/GITHUB-CICD.md for full checklist."
