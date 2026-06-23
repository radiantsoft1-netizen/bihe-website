#!/usr/bin/env bash
# Fix common Hostinger issues after a failed/partial migrate (index name too long, PHP 8.1).
# Usage: cd /path/to/admin && bash scripts/fix-hostinger-partial-migrate.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
source "$(dirname "$0")/hostinger-resolve-php.sh"

echo "==> PHP: $PHP_BIN"

# Faculty pivot unique index (MySQL max identifier 64 chars)
"$PHP_BIN" artisan tinker --execute="
if (! Schema::hasTable('faculty_faculty_department')) {
    echo 'Table faculty_faculty_department missing — run migrate first';
    exit(1);
}
try {
    DB::statement('ALTER TABLE faculty_faculty_department ADD UNIQUE faculty_dept_assignment_unique (faculty_id, faculty_department_id)');
    echo 'Added faculty_dept_assignment_unique';
} catch (Throwable \$e) {
    echo \$e->getMessage();
}
"

"$PHP_BIN" artisan tinker --execute="
DB::table('migrations')->insertOrIgnore([
    'migration' => '2024_06_10_000001_create_faculty_faculty_department_table',
    'batch' => DB::table('migrations')->max('batch') ?: 1,
]);
echo 'Migration row ensured';
"

echo "==> Continue with: bash scripts/post-deploy-hostinger.sh"
