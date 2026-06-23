#!/usr/bin/env bash
# Push BIHE monorepo (Frontend + Backend) to GitHub.
# Prerequisite: empty repo exists at https://github.com/radiantsoft1-netizen/bihe-website
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OWNER="${GITHUB_OWNER:-radiantsoft1-netizen}"
REPO="${GITHUB_REPO:-bihe-website}"
REMOTE="https://github.com/${OWNER}/${REPO}.git"

echo "==> Checking GitHub auth..."
if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login -h github.com -p https -s repo -w"
  exit 1
fi

echo "==> Verifying repo ${OWNER}/${REPO}..."
if ! gh repo view "${OWNER}/${REPO}" >/dev/null 2>&1; then
  echo ""
  echo "Repo not found. Create it first (empty, no README):"
  echo "  https://github.com/new"
  echo "  Name: ${REPO}"
  echo "  Owner: ${OWNER}"
  echo ""
  echo "Or run (needs repo scope on your token):"
  echo "  gh repo create ${REPO} --private --description \"BIHE website + Laravel admin\""
  exit 1
fi

git remote set-url origin "$REMOTE"

echo "==> Fetching remote..."
git fetch origin || true

if git rev-parse --verify origin/main >/dev/null 2>&1; then
  echo "==> Remote has main; merging if needed..."
  git pull origin main --no-rebase --no-edit || {
    echo "Merge failed. Resolve conflicts, then: git push origin main"
    exit 1
  }
fi

echo "==> Pushing main..."
git push -u origin main

echo ""
echo "Done: https://github.com/${OWNER}/${REPO}"
