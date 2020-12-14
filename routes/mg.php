<?php

use Illuminate\Support\Facades\Route;

Route::pattern('mg', '(mg.|www.mg.)');
Route::domain('{mg}' . env('APP_URL'))
    ->group(function () {
        // Route::get('/', function() {
        //     return 'Test';
        // });
        Route::get('/', 'MgController@index')->name('home');
        Route::post('/mail', 'MgController@mail')->name('mail');
    });

