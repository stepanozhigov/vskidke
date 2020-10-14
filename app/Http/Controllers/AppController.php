<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    public function index($subdomain)

    {
        return view($subdomain . '.app');
    }
}
