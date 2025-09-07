<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
*/

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Load Configuration
|--------------------------------------------------------------------------
*/

// Load environment file
if (file_exists($app->environmentPath().'/'.$app->environmentFile())) {
    (Dotenv\Dotenv::createImmutable($app->environmentPath(), $app->environmentFile()))->load();
}

/*
|--------------------------------------------------------------------------
| Load Routes
|--------------------------------------------------------------------------
*/

$app->singleton('router', function ($app) {
    return new Illuminate\Routing\Router($app['events'], $app);
});

// Register API routes
$app->make('router')->group(['prefix' => 'api'], function ($router) {
    require __DIR__.'/../routes/api.php';
});

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
*/

return $app;
