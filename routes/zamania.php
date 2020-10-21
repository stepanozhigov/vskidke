<?php

use Illuminate\Support\Facades\Route;

Route::domain('romatti.' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'ZamaniaController@index')->name('home');
        //Route::post('/bitrix', 'RomattiController@bitrix')->name('bitrix');
    });
