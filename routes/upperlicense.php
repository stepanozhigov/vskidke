<?php

use Illuminate\Support\Facades\Route;

Route::pattern('upperlicense', '(upperlicense.|www.upperlicense.)');
Route::domain('{upperlicense}' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'UpperlicenseController@index')->name('home');
        Route::post('/ammoconnect', 'UpperlicenseController@ammoconnect')->name('ammoconnect');
    });

