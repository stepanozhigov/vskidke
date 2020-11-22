<?php

use Illuminate\Support\Facades\Route;

Route::pattern('localhost', '(localhost)');
Route::domain('{localhost}')
    ->group(function () {
        Route::get('/{city?}', function () {
            return view('app');
           })->where('city', '[\/\w\.-]*');
        Route::post('/bx24', 'EkonompotolokController@bitrix24')->name('bitrix24');
    });
