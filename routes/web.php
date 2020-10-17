<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\LeadController;
use Illuminate\Support\Facades\Route;

Route::domain('{subdomain}.'.env('APP_URL'))->group(function () {

    Route::get('/', [AppController::class, 'index']);
});

Route::post('/lead', [LeadController::class, 'store']);
