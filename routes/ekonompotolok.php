<?php

use Illuminate\Support\Facades\Route;

Route::pattern('ekonompotolok', '(econom.|www.econom.)');
Route::domain('{ekonompotolok}' . (env('APP_ENV') == 'local' ? env('APP_ENV') : env('APP_URL')))
    ->group(function () {
        // Route::get('/', 'EkonompotolokController@index')->name('home');
        Route::get('/{city}', function () {
            return view('app');
           })->where('city', '[\/\w\.-]*');
        Route::post('/bx24', 'EkonompotolokController@bitrix24')->name('bitrix24');
    });
