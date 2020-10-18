<?php

use Illuminate\Support\Facades\Route;

Route::domain('potolki.'.env('APP_URL'))
    ->group(function() {
        Route::get('/', 'PotolkiController@index')->name('home');
        Route::post('/bitrix', 'PotolkiController@bitrix')->name('bitrix');
});