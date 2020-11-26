<?php

use Illuminate\Support\Facades\Route;

Route::pattern('econom', '(econom.|www.econom.)');
Route::domain('{econom}' .env('APP_URL'))
    ->group(function () {
        // Route::get('/', 'EkonompotolokController@index')->name('home');
        Route::get('/{city}', function () {
            return view('app');
           })->where('city', '[\/\w\.-]*');
        Route::post('/bx24', 'EkonompotolokController@bitrix24')->name('bitrix24');
    });
