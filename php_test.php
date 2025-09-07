<?php
/**
 * PHP Environment Test for Galloways Laravel Application
 * Upload this to your cPanel and visit it to verify PHP setup
 */

echo "<h1>PHP Environment Test for Galloways Insurance</h1>";

// Check PHP Version
echo "<h2>PHP Version Check</h2>";
$phpVersion = PHP_VERSION;
$requiredVersion = '8.2.0';

if (version_compare($phpVersion, $requiredVersion, '>=')) {
    echo "✅ <strong>PHP Version: $phpVersion</strong> (Required: >= $requiredVersion)<br>";
} else {
    echo "❌ <strong>PHP Version: $phpVersion</strong> (Required: >= $requiredVersion)<br>";
    echo "<p style='color: red;'>Please upgrade PHP to version 8.2 or higher in cPanel.</p>";
}

// Check Required Extensions
echo "<h2>Required Extensions Check</h2>";
$requiredExtensions = [
    'bcmath' => 'Mathematical calculations',
    'ctype' => 'Character type checking', 
    'curl' => 'HTTP requests',
    'dom' => 'XML processing',
    'fileinfo' => 'File information',
    'filter' => 'Data filtering',
    'hash' => 'Hashing functions',
    'json' => 'JSON processing',
    'mbstring' => 'Multibyte strings',
    'openssl' => 'SSL/encryption',
    'pcre' => 'Regular expressions',
    'pdo' => 'Database abstraction',
    'pdo_pgsql' => 'PostgreSQL support',
    'session' => 'Session handling',
    'tokenizer' => 'PHP tokenizer',
    'xml' => 'XML support',
    'zip' => 'Archive handling'
];

$allGood = true;
foreach ($requiredExtensions as $extension => $description) {
    if (extension_loaded($extension)) {
        echo "✅ <strong>$extension</strong> - $description<br>";
    } else {
        echo "❌ <strong>$extension</strong> - $description (MISSING)<br>";
        $allGood = false;
    }
}

// Summary
echo "<h2>Summary</h2>";
if ($allGood && version_compare($phpVersion, $requiredVersion, '>=')) {
    echo "<p style='color: green; font-weight: bold;'>🎉 Your server is ready for Laravel 10!</p>";
    echo "<p>You can now run: <code>composer install</code> in your Laravel directory.</p>";
} else {
    echo "<p style='color: red; font-weight: bold;'>⚠️ Please fix the issues above before deploying Laravel.</p>";
}

// Additional Info
echo "<h2>Server Information</h2>";
echo "<strong>Server Software:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "<strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "<strong>Current Time:</strong> " . date('Y-m-d H:i:s') . "<br>";

echo "<hr>";
echo "<p><small>Delete this file after testing for security reasons.</small></p>";
?>
