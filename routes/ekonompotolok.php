<?php

use Illuminate\Support\Facades\Route;

Route::pattern('ekonompotolok', '(ekonom-potolok.|www.ekonom-potolok.|www.xn----stbbddfgbcabi4bzk.|xn----stbbddfgbcabi4bzk.)');
Route::domain('{ekonompotolok}' . (env('APP_ENV') == 'local' ? env('APP_ENV') : env('APP_URL_RUS')))
    ->group(function () {
        // Route::get('/', 'EkonompotolokController@index')->name('home');
        Route::get('/{city}', function () {
            return view('app');
           })->where('city', '[\/\w\.-]*');
        Route::post('/bx24', 'EkonompotolokController@bitrix24')->name('bitrix24');
    });
