<?php
// public_html/api/index.php - Laravel entry point for cPanel
// Update $BASE_PATH to your actual cPanel home directory
$BASE_PATH = '/home/gallowa2/backend-laravel';

// Load Laravel application
require $BASE_PATH . '/vendor/autoload.php';
$app = require_once $BASE_PATH . '/bootstrap/app.php';

// Handle the request
$app->run();
