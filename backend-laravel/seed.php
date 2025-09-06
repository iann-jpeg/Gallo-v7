<?php
// Lightweight seeder that connects via PDO (Postgres) and creates tables + sample rows.
// Usage: php seed.php

function env($key, $default = null) {
    if (!file_exists(__DIR__ . '/.env')) return $default;
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        [$k,$v] = array_map('trim', explode('=', $line, 2) + [1 => null]);
        if ($k === $key) return $v;
    }
    return $default;
}

$host = env('DB_HOST', '127.0.0.1');
$port = env('DB_PORT', '5432');
$db   = env('DB_DATABASE', 'your_db');
$user = env('DB_USERNAME', 'your_user');
$pass = env('DB_PASSWORD', 'your_password');

$dsn = "pgsql:host=$host;port=$port;dbname=$db";
echo "Connecting to $dsn as $user...\n";
try {
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

echo "Creating tables (if not exist) and seeding sample data...\n";
$sql = file_get_contents(__DIR__ . '/db_seed.sql');
$pdo->exec($sql);

echo "Done.\n";

// Optional quick check
$stmt = $pdo->query("SELECT count(*) as c FROM users");
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo "Users in DB: " . ($row['c'] ?? 0) . "\n";

echo "Sample data seeded. You can now hit /api/admin endpoints.\n";
