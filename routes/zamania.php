<?php

use Illuminate\Support\Facades\Route;

Route::domain('zamania.' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'ZamaniaController@index')->name('home');
        Route::post('/bx24', 'ZamaniaController@bitrix24')->name('bitrix24');
    });
