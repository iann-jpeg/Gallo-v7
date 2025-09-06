<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(dirname(__DIR__)))->bootstrap();

$app = new Laravel\Lumen\Application(dirname(__DIR__));

// Enable facades and Eloquent ORM
$app->withFacades();
$app->withEloquent();

// Register global middleware
$app->middleware([
	App\Http\Middleware\CorsMiddleware::class,
]);

// Load application routes (keeps routing centralized in routes/api.php)
require_once __DIR__ . '/../routes/api.php';

return $app;
