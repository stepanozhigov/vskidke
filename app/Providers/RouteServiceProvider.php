<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\Http\Controllers';
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {

            // Route::prefix('api')
            //     ->middleware('api')
            //     ->namespace($this->namespace)
            //     ->group(base_path('routes/api.php'));

            //AUTOSCHOOL
            Route::middleware('web')
                ->name('autoschool.')
                ->namespace($this->namespace . '\Autoschool')
                ->group(base_path('routes/autoschool.php'));

            //POTOLKI
            Route::middleware('web')
                ->name('potolki.')
                ->namespace($this->namespace . '\Potolki')
                ->group(base_path('routes/potolki.php'));

            //ROMATTI
            Route::middleware('web')
                ->name('romatti.')
                ->namespace($this->namespace . '\Romatti')
                ->group(base_path('routes/romatti.php'));

            //ZAMANIA
            Route::middleware('web')
                ->name('zamania.')
                ->namespace($this->namespace . '\Zamania')
                ->group(base_path('routes/zamania.php'));

            //UPPERLICENSE
            Route::middleware('web')
                ->name('upperlicense.')
                ->namespace($this->namespace . '\Upperlicense')
                ->group(base_path('routes/upperlicense.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60);
        });
    }
}
