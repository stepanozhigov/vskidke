<?php

use Illuminate\Support\Facades\Route;

Route::pattern('koronateh', '(koronateh.|www.koronateh.)');
Route::domain('{koronateh}' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'KoronatehController@index')->name('home');
        Route::post('/mail', 'KoronatehController@mail')->name('mail');
    });
