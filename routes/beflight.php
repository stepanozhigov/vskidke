<?php

use Illuminate\Support\Facades\Route;

Route::pattern('beflight', '(beflight.|www.beflight.)');
Route::domain('{beflight}' . env('APP_URL'))
    ->group(function () {
        // Route::get('/', function() {
        //     return 'Test';
        // });
        Route::get('/', 'BeflightController@index')->name('home');
        Route::post('/ammoconnect', 'BeflightController@ammoconnect')->name('ammoconnect');
    });

