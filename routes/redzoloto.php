<?php

use Illuminate\Support\Facades\Route;

Route::pattern('redzoloto', '(redzoloto.|www.redzoloto.)');
Route::domain('{redzoloto}' . env('APP_URL'))
    ->group(function () {
        // Route::get('/', function() {
        //     return 'Test';
        // });
        Route::get('/', 'RedzolotoController@index')->name('home');
        Route::post('/mail', 'RedzolotoController@mail')->name('mail');
    });

