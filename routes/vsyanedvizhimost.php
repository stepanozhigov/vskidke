<?php

use Illuminate\Support\Facades\Route;

Route::pattern('vsyanedvizhimost', '(vsyanedvizhimost.|www.vsyanedvizhimost.|www.xn----ctbbheinb0bds0ako4m9a.|xn----ctbbheinb0bds0ako4m9a.)');
Route::domain('{vsyanedvizhimost}' . (env('APP_ENV') == 'local' ? env('APP_ENV') : env('APP_URL_RUS')))
    ->group(function () {
        Route::get('/', 'VsyanedvizhimostController@index')->name('home');
        Route::post('/mail', 'VsyanedvizhimostController@mail')->name('mail');
    });
