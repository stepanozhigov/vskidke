<?php

use Illuminate\Support\Facades\Route;

Route::domain('upperlicense.' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'UpperlicenseController@index')->name('home');
        Route::post('/bx24', 'UpperlicenseController@bitrix24')->name('bitrix24');
    });
