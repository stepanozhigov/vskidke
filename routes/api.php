<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/hereapi', 'LocationController@hereapi')->name('hereapi');