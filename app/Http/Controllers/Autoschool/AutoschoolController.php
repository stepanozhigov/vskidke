<?php

namespace App\Http\Controllers\Autoschool;

use App\Http\Controllers\Controller;
use App\Mail\Autoschool\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class AutoschoolController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function lead(Request $request)
    {
        Mail::to(env('MAIL_TO_AUTOSCHOOL'))->send(new SendMail($request->phone, $request->tag));
    }
}
