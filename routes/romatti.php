<?php

use Illuminate\Support\Facades\Route;

Route::pattern('romatti', '(romatti.|www.romatti.)');
Route::domain('{romatti}' . env('APP_URL'))
    ->group(function () {
        Route::get('/', 'RomattiController@index')->name('home');
        Route::post('/bx24', 'RomattiController@bitrix24')->name('bitrix24');
        Route::post('/roistat', 'RomattiController@roistat')->name('roistat');
    });
