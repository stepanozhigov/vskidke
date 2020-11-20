<?php

use Illuminate\Support\Facades\Route;

Route::pattern('localhost', '(localhost)');
Route::domain('{localhost}')
    ->group(function () {
        Route::get('/', 'EkonompotolokController@index')->name('home');
        Route::post('/bx24', 'EkonompotolokController@bitrix24')->name('bitrix24');
    });
