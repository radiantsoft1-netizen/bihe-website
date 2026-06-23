#!/usr/bin/env php
<?php
/**
 * Export local SQLite database to a MySQL-compatible .sql dump for Hostinger phpMyAdmin import.
 *
 * Usage:
 *   php scripts/export-mysql-dump.php [output-path]
 *
 * Default output: ../tmp/final-deliverables/bihe-database-mysql.sql
 */

declare(strict_types=1);

$root = dirname(__DIR__);
$sqlitePath = $root . '/database/database.sqlite';
$defaultOut = dirname($root) . '/tmp/final-deliverables/bihe-database-mysql.sql';
$outputPath = $argv[1] ?? $defaultOut;

if (! is_file($sqlitePath)) {
    fwrite(STDERR, "SQLite database not found: {$sqlitePath}\n");
    exit(1);
}

$pdo = new PDO('sqlite:' . $sqlitePath, null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$outDir = dirname($outputPath);
if (! is_dir($outDir)) {
    mkdir($outDir, 0755, true);
}

$fh = fopen($outputPath, 'wb');
if ($fh === false) {
    fwrite(STDERR, "Cannot write: {$outputPath}\n");
    exit(1);
}

function writeln($fh, string $line = ''): void
{
    fwrite($fh, $line . "\n");
}

function mysqlQuote(?string $value): string
{
    if ($value === null) {
        return 'NULL';
    }

    $escaped = str_replace('\\', '\\\\', $value);
    $escaped = str_replace("'", "''", $escaped);
    $escaped = str_replace("\n", '\\n', $escaped);
    $escaped = str_replace("\r", '\\r', $escaped);

    return "'" . $escaped . "'";
}

/**
 * @param array<string, array<string, string>> $mysqlColumnTypes
 */
function formatInsertValue(string $table, string $column, mixed $value, array $mysqlColumnTypes): string
{
    if ($value === null) {
        return 'NULL';
    }

    $mysqlType = $mysqlColumnTypes[$table][$column] ?? 'TEXT';

    if ($mysqlType === 'TINYINT(1)' || str_starts_with($mysqlType, 'BIGINT') || str_starts_with($mysqlType, 'INT')) {
        return (string) (int) $value;
    }

    if ($mysqlType === 'DATE' && is_string($value)) {
        return mysqlQuote(substr($value, 0, 10));
    }

    return mysqlQuote((string) $value);
}

/**
 * Laravel/SQLite column types that must stay index-safe on MySQL (utf8mb4).
 *
 * @var array<string, array<string, string>>
 */
const MYSQL_COLUMN_TYPE_OVERRIDES = [
    'news_events' => [
        'published' => 'TINYINT(1)',
        'event_date' => 'DATE',
        'is_featured' => 'TINYINT(1)',
        'show_in_ticker' => 'TINYINT(1)',
    ],
    'documents' => ['published' => 'TINYINT(1)'],
    'gallery_albums' => ['published' => 'TINYINT(1)', 'is_featured' => 'TINYINT(1)'],
    'gallery_items' => ['published' => 'TINYINT(1)'],
    'gallery_categories' => ['is_active' => 'TINYINT(1)'],
    'hero_banners' => ['active' => 'TINYINT(1)'],
    'announcements' => ['active' => 'TINYINT(1)'],
    'faculty' => ['published' => 'TINYINT(1)'],
    'faculty_departments' => ['is_active' => 'TINYINT(1)'],
    'governing_bodies' => ['published' => 'TINYINT(1)', 'reverse_layout' => 'TINYINT(1)'],
    'news_categories' => ['is_active' => 'TINYINT(1)'],
    'site_pages' => ['published' => 'TINYINT(1)'],
    'menu_items' => ['is_visible' => 'TINYINT(1)', 'open_in_new_tab' => 'TINYINT(1)'],
    'users' => ['is_active' => 'TINYINT(1)'],
    'recruiting_partners' => ['active' => 'TINYINT(1)'],
    'circular_notices' => ['published' => 'TINYINT(1)', 'published_date' => 'DATE'],
    'info_corner_items' => [
        'published' => 'TINYINT(1)',
        'published_date' => 'DATE',
        'show_in_home_scroller' => 'TINYINT(1)',
        'badge_visible' => 'TINYINT(1)',
    ],
    'info_corner_categories' => ['published' => 'TINYINT(1)'],
    'placement_drives' => ['published' => 'TINYINT(1)', 'event_date' => 'DATE'],
    'alumni_events' => ['published' => 'TINYINT(1)', 'event_date' => 'DATE'],
    'alumni_profiles' => [
        'published' => 'TINYINT(1)',
        'is_featured' => 'TINYINT(1)',
        'willing_to_mentor' => 'TINYINT(1)',
        'date_of_birth' => 'DATE',
    ],
];

function inferMysqlTypeFromColumnName(string $columnName): ?string
{
    if (preg_match('/_(at)$/', $columnName) || in_array($columnName, ['created_at', 'updated_at', 'deleted_at'], true)) {
        return 'DATETIME';
    }

    if (preg_match('/_date$/', $columnName) || $columnName === 'date_of_birth') {
        return 'DATE';
    }

    if (
        $columnName === 'published' ||
        $columnName === 'active' ||
        str_starts_with($columnName, 'is_') ||
        str_starts_with($columnName, 'show_') ||
        str_starts_with($columnName, 'willing_') ||
        str_starts_with($columnName, 'badge_') ||
        $columnName === 'open_in_new_tab' ||
        $columnName === 'reverse_layout'
    ) {
        return 'TINYINT(1)';
    }

    return null;
}

function sqliteDefToMysqlType(string $table, string $columnName, string $def): string
{
    if (isset(MYSQL_COLUMN_TYPE_OVERRIDES[$table][$columnName])) {
        return MYSQL_COLUMN_TYPE_OVERRIDES[$table][$columnName];
    }

    $def = strtolower(trim($def));

    if (preg_match('/varchar\((\d+)\)/', $def, $vm)) {
        return 'VARCHAR(' . $vm[1] . ')';
    }
    if (str_contains($def, 'varchar')) {
        return 'VARCHAR(255)';
    }
    if (str_contains($def, 'longtext')) {
        return 'LONGTEXT';
    }
    if (preg_match('/\bboolean\b|\bbool\b/', $def) || str_contains($def, 'tinyint(1)')) {
        return 'TINYINT(1)';
    }
    if (preg_match('/\btinyint\b/', $def)) {
        return 'TINYINT(1)';
    }
    if (str_contains($def, 'datetime') || str_contains($def, 'timestamp')) {
        return 'DATETIME';
    }
    if (preg_match('/\bdate\b/', $def)) {
        return 'DATE';
    }
    if (preg_match('/\btime\b/', $def) && ! str_contains($def, 'datetime') && ! str_contains($def, 'timestamp')) {
        return 'TIME';
    }
    if (str_contains($def, 'text')) {
        return 'TEXT';
    }
    if (str_contains($def, 'integer') || preg_match('/\bint\b/', $def)) {
        if ($columnName === 'id' || str_ends_with($columnName, '_id')) {
            return 'BIGINT UNSIGNED';
        }

        return 'INT UNSIGNED';
    }
    if (str_contains($def, 'numeric') || str_contains($def, 'decimal')) {
        return 'DECIMAL(10,2)';
    }
    if (str_contains($def, 'real') || str_contains($def, 'float') || str_contains($def, 'double')) {
        return 'DOUBLE';
    }

    $inferred = inferMysqlTypeFromColumnName($columnName);

    return $inferred ?? 'TEXT';
}

/**
 * @param-out array<string, string> $mysqlTypes
 */
function convertCreateTable(string $sql, ?array &$mysqlTypes = null): ?string
{
    $sql = trim($sql);
    if (! preg_match('/^CREATE TABLE(?: IF NOT EXISTS)? "([^"]+)"\s*\((.*)\)\s*;?$/is', $sql, $m)) {
        return null;
    }

    $table = $m[1];
    $body = $m[2];
    $columns = [];
    $constraints = [];
    $mysqlTypes = [];

    foreach (preg_split('/,\s*(?=(?:[^"]*"[^"]*")*[^"]*$)/', $body) as $part) {
        $part = trim($part);
        if ($part === '') {
            continue;
        }

        if (preg_match('/^primary key \("([^"]+)"\)$/i', $part, $pk)) {
            $constraints[] = 'PRIMARY KEY (`' . $pk[1] . '`)';
            continue;
        }

        if (preg_match('/^primary key \((.+)\)$/i', $part, $pk)) {
            $cols = preg_replace('/"([^"]+)"/', '`$1`', $pk[1]);
            $constraints[] = 'PRIMARY KEY (' . $cols . ')';
            continue;
        }

        if (preg_match('/^foreign key/i', $part)) {
            $converted = preg_replace('/"([^"]+)"/', '`$1`', $part);
            $converted = preg_replace('/references\s+([a-z_]+)\(/i', 'REFERENCES `$1`(', $converted);
            $converted = preg_replace('/^foreign key/i', 'FOREIGN KEY', $converted);
            $constraints[] = $converted;
            continue;
        }

        if (! preg_match('/^"([^"]+)"\s+(.+)$/s', $part, $col)) {
            continue;
        }

        $name = $col[1];
        $def = strtolower($col[2]);

        if (str_contains($def, 'primary key autoincrement')) {
            $columns[] = "`{$name}` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT";
            $constraints[] = "PRIMARY KEY (`{$name}`)";
            $mysqlTypes[$name] = 'BIGINT UNSIGNED';
            continue;
        }

        $mysqlType = sqliteDefToMysqlType($table, $name, $def);
        $mysqlTypes[$name] = $mysqlType;
        $nullable = ! str_contains($def, ' not null');
        $default = null;

        if (preg_match("/default\s+'([^']*)'/i", $def, $dm)) {
            $default = $dm[1];
        } elseif (preg_match('/default\s+(\d+)/i', $def, $dm)) {
            $default = $dm[1];
        }

        $line = "`{$name}` {$mysqlType}" . ($nullable ? ' NULL' : ' NOT NULL');

        if ($default !== null) {
            if (
                $mysqlType === 'TINYINT(1)' ||
                str_starts_with($mysqlType, 'BIGINT') ||
                str_starts_with($mysqlType, 'INT')
            ) {
                $line .= " DEFAULT {$default}";
            } else {
                $line .= ' DEFAULT ' . mysqlQuote($default);
            }
        }

        $columns[] = $line;
    }

    if ($columns === []) {
        return null;
    }

    $all = array_merge($columns, $constraints);

    return 'CREATE TABLE `' . $table . '` (' . "\n  " . implode(",\n  ", $all) . "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
}

function mysqlIdentifier(string $name, int $maxLen = 64): string
{
    if (strlen($name) <= $maxLen) {
        return $name;
    }

    $hash = substr(md5($name), 0, 8);
    $suffix = '_' . $hash;
    $baseMax = $maxLen - strlen($suffix);

    return substr($name, 0, $baseMax) . $suffix;
}

function indexNeedsPrefix(string $mysqlType): bool
{
    if ($mysqlType === 'TEXT'
        || $mysqlType === 'LONGTEXT'
        || $mysqlType === 'MEDIUMTEXT'
        || $mysqlType === 'TINYTEXT') {
        return true;
    }

    if (preg_match('/^VARCHAR\((\d+)\)$/', $mysqlType, $match)) {
        return (int) $match[1] > 191;
    }

    return false;
}

/**
 * @param array<string, array<string, string>> $mysqlColumnTypes table → column → mysql type
 */
function indexColumnExpr(string $table, string $column, array $mysqlColumnTypes): string
{
    $mysqlType = $mysqlColumnTypes[$table][$column] ?? 'TEXT';
    $quoted = '`' . $column . '`';

    if (indexNeedsPrefix($mysqlType)) {
        return "{$quoted}(191)";
    }

    return $quoted;
}

/**
 * @param array<string, array<string, string>> $mysqlColumnTypes
 */
function auditIndexColumnTypes(string $indexSql, array $mysqlColumnTypes): void
{
    if (! preg_match('/^CREATE (?:UNIQUE )?INDEX .+ ON `([^`]+)` \((.+)\);$/i', $indexSql, $m)) {
        return;
    }

    $table = $m[1];
    foreach (preg_split('/\s*,\s*/', $m[2]) as $part) {
        $column = trim($part, '` ');
        if (str_contains($column, '(')) {
            continue;
        }

        $mysqlType = $mysqlColumnTypes[$table][$column] ?? 'TEXT';
        if (indexNeedsPrefix($mysqlType)) {
            fwrite(STDERR, "WARNING: index on `{$table}`.`{$column}` ({$mysqlType}) needs prefix; check export output.\n");
        }
    }
}

/**
 * @param array<string, array<string, string>> $mysqlColumnTypes
 */
function convertIndex(string $sql, array $mysqlColumnTypes): ?string
{
    $sql = trim($sql);
    if (! preg_match('/^CREATE (UNIQUE )?INDEX(?: IF NOT EXISTS)? "([^"]+)" on "([^"]+)" \((.+)\);?$/i', $sql, $m)) {
        return null;
    }

    $unique = $m[1] !== '' ? 'UNIQUE ' : '';
    $index = mysqlIdentifier($m[2]);
    $table = $m[3];
    $rawCols = preg_split('/\s*,\s*/', $m[4]);
    $cols = implode(', ', array_map(
        static fn (string $part): string => indexColumnExpr(
            $table,
            trim($part, '" '),
            $mysqlColumnTypes,
        ),
        $rawCols,
    ));

    $converted = "CREATE {$unique}INDEX `{$index}` ON `{$table}` ({$cols});";
    auditIndexColumnTypes($converted, $mysqlColumnTypes);

    return $converted;
}

writeln($fh, '-- BIHE Admin — MySQL dump for Hostinger phpMyAdmin');
writeln($fh, '-- Generated: ' . gmdate('Y-m-d H:i:s') . ' UTC');
writeln($fh, '-- Source: database/database.sqlite');
writeln($fh, '-- Charset: utf8mb4');
writeln($fh);
writeln($fh, 'SET NAMES utf8mb4;');
writeln($fh, 'SET FOREIGN_KEY_CHECKS = 0;');
writeln($fh, 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";');
writeln($fh, 'SET time_zone = "+00:00";');
writeln($fh);

$schemaRows = $pdo->query("SELECT sql FROM sqlite_master WHERE type IN ('table','index') AND name NOT LIKE 'sqlite_%' ORDER BY type DESC, name ASC")->fetchAll(PDO::FETCH_COLUMN);

$createStatements = [];
$indexStatements = [];
/** @var array<string, array<string, string>> $mysqlColumnTypes */
$mysqlColumnTypes = [];

foreach ($schemaRows as $sql) {
    if ($sql === null) {
        continue;
    }
    if (stripos($sql, 'CREATE TABLE') === 0) {
        $tableTypes = [];
        $converted = convertCreateTable($sql, $tableTypes);
        if ($converted !== null && preg_match('/^CREATE TABLE(?: IF NOT EXISTS)? "([^"]+)"/i', $sql, $tm)) {
            $createStatements[] = $converted;
            $mysqlColumnTypes[$tm[1]] = $tableTypes;
        }
    }
}

foreach ($schemaRows as $sql) {
    if ($sql === null) {
        continue;
    }
    if (stripos($sql, 'CREATE INDEX') === 0 || stripos($sql, 'CREATE UNIQUE INDEX') === 0) {
        $converted = convertIndex($sql, $mysqlColumnTypes);
        if ($converted !== null) {
            $indexStatements[] = $converted;
        }
    }
}

$tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")->fetchAll(PDO::FETCH_COLUMN);

foreach ($tables as $table) {
    writeln($fh, "DROP TABLE IF EXISTS `{$table}`;");
}

writeln($fh);

foreach ($createStatements as $stmt) {
    writeln($fh, $stmt);
    writeln($fh);
}

foreach ($indexStatements as $stmt) {
    writeln($fh, $stmt);
}

writeln($fh);

foreach ($tables as $table) {
    $rows = $pdo->query("SELECT * FROM \"{$table}\"")->fetchAll();
    if ($rows === []) {
        continue;
    }

    $columns = array_keys($rows[0]);
    $colList = implode(', ', array_map(static fn (string $c): string => "`{$c}`", $columns));

    writeln($fh, "-- Data for table `{$table}`");
    foreach ($rows as $row) {
        $values = implode(', ', array_map(
            static fn ($column, $value): string => formatInsertValue($table, (string) $column, $value, $mysqlColumnTypes),
            array_keys($row),
            array_values($row),
        ));
        writeln($fh, "INSERT INTO `{$table}` ({$colList}) VALUES ({$values});");
    }
    writeln($fh);

    if (in_array('id', $columns, true)) {
        $maxId = $pdo->query("SELECT MAX(id) FROM \"{$table}\"")->fetchColumn();
        if ($maxId !== false && $maxId !== null) {
            writeln($fh, "ALTER TABLE `{$table}` AUTO_INCREMENT = " . ((int) $maxId + 1) . ';');
            writeln($fh);
        }
    }
}

writeln($fh, 'SET FOREIGN_KEY_CHECKS = 1;');
writeln($fh, '-- End of dump');

fclose($fh);

$size = filesize($outputPath);
echo "MySQL dump written to: {$outputPath}\n";
echo 'Size: ' . round($size / 1024, 1) . " KB\n";
