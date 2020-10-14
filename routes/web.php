<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

//Route::view('/', 'autoschool');
Route::domain('{subdomain}.vskidke.' . (env('APP_ENV') == 'local' ? 'local' : 'ru'))->group(function () {

    Route::get('/', [AppController::class, 'index']);
});
