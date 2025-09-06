<?php
// Sample public_html/api/index.php
// Update $BASE_PATH to your cPanel home path where you uploaded backend-laravel
$BASE_PATH = '/home/your_cpanel_user/backend-laravel';

require $BASE_PATH . '/vendor/autoload.php';
require $BASE_PATH . '/bootstrap/app.php';

$app = require_once $BASE_PATH . '/bootstrap/app.php';
$app->run();
