<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hereapi', 'LocationController@hereapi')->name('hereapi');
Route::get('/ipapi', 'LocationController@ipapi')->name('ipapi');