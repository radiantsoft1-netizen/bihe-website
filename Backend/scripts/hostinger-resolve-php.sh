#!/usr/bin/env bash
# Resolve PHP 8.2+ on Hostinger shared hosting (CLI default is often 8.1).
# Usage: source scripts/hostinger-resolve-php.sh
resolve_hostinger_php() {
  if [[ -n "${BIHE_PHP_BIN:-}" ]] && [[ -x "${BIHE_PHP_BIN}" ]]; then
    PHP_BIN="${BIHE_PHP_BIN}"
    return 0
  fi

  local candidate
  for candidate in \
    php \
    /opt/alt/php85/usr/bin/php \
    /opt/alt/php84/usr/bin/php \
    /opt/alt/php83/usr/bin/php \
    /opt/alt/php82/usr/bin/php \
    /usr/bin/php82 \
    /usr/bin/php83; do
    if [[ -x "$candidate" ]] && "$candidate" -r 'exit(version_compare(PHP_VERSION, "8.2.0", ">=") ? 0 : 1);' 2>/dev/null; then
      PHP_BIN="$candidate"
      return 0
    fi
  done

  echo "Error: PHP 8.2+ not found. Set PHP 8.2+ in hPanel or export BIHE_PHP_BIN=/opt/alt/php85/usr/bin/php" >&2
  return 1
}

resolve_hostinger_php || exit 1
export PHP_BIN
