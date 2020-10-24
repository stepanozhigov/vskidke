<?php

use Illuminate\Support\Facades\Route;

Route::pattern('potolki', '(potolki.|www.potolki.)');
Route::domain('{potolki}' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'PotolkiController@index')->name('home');
        Route::post('/bitrix', 'PotolkiController@bitrix')->name('bitrix');
    });
