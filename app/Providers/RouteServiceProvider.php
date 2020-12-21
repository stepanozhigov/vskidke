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

            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace. "\API")
                ->group(base_path('routes/api.php'));

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

            //ROMATTI2
            Route::middleware('web')
                ->name('romatti2.')
                ->namespace($this->namespace . '\Romatti2')
                ->group(base_path('routes/romatti2.php'));

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

            //KORONATEH
            Route::middleware('web')
                ->name('koronateh.')
                ->namespace($this->namespace . '\Koronateh')
                ->group(base_path('routes/koronateh.php'));

            //Vsyanedvizhimost
            Route::middleware('web')
                ->name('vsyanedvizhimost.')
                ->namespace($this->namespace . '\Vsyanedvizhimost')
                ->group(base_path('routes/vsyanedvizhimost.php'));

            //Ekonompotolok
            Route::middleware('web')
            ->name('econom.')
            ->namespace($this->namespace . '\Ekonompotolok')
            ->group(base_path('routes/ekonompotolok.php'));

            //Beflight
            Route::middleware('web')
                ->name('beflight.')
                ->namespace($this->namespace . '\Beflight')
                ->group(base_path('routes/beflight.php'));

            //Mg
            Route::middleware('web')
                ->name('mg.')
                ->namespace($this->namespace . '\Mg')
                ->group(base_path('routes/mg.php'));

            //Redzoloto
            Route::middleware('web')
                ->name('redzoloto.')
                ->namespace($this->namespace . '\Redzoloto')
                ->group(base_path('routes/redzoloto.php'));

            //localhost
            Route::middleware('web')
            ->name('ekonompotolok.')
            ->namespace($this->namespace . '\Ekonompotolok')
            ->group(base_path('routes/localhost.php'));
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
