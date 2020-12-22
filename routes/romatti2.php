<?php

use Illuminate\Support\Facades\Route;

Route::pattern('romatti2', '(romatti2.|www.romatti2.)');
Route::domain('{romatti2}' . env('APP_URL'))
    ->group(function () {
        // Route::get('/', function() {
        //     return 'Test';
        // });
        Route::get('/', 'Romatti2Controller@index')->name('home');
        //Route::post('/bx24', 'Romatti2Controller@bitrix24')->name('bitrix24');
        Route::post('/roistat', 'Romatti2Controller@roistat')->name('roistat');
    });

