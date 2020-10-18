<?php

use Illuminate\Support\Facades\Route;

$subdomains = explode('|',env('APP_SUBDOMAINS'));
foreach($subdomains as $subdomain) {
    Route::domain($subdomain.'.'.env('APP_URL'))
        ->name($subdomain.'.')
        ->namespace(ucfirst($subdomain))
        ->group(function() use ($subdomain) {
            Route::get('/', ucfirst($subdomain).'Controller@index')->name('home');
            Route::post('/mail', ucfirst($subdomain).'Controller@mail')->name('mail');
            Route::post('/bitrix', ucfirst($subdomain).'Controller@bitrix')->name('bitrix');
    });
}