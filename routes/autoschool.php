<?php

use Illuminate\Support\Facades\Route;

Route::domain('autoschool.'.env('APP_URL'))
    ->group(function() {
        Route::get('/', 'AutoschoolController@index')->name('home');
        Route::post('/lead', 'AutoschoolController@lead')->name('lead');
});