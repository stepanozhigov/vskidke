<?php

namespace App\Http\Controllers\Autoschool;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AutoschoolController extends Controller
{
    public function index()

    {
        return view('autoschool.app');
    }

    public function lead(Request $request)
    {
        Mail::to(env('MAIL_TO_AUTOSCHOOL'))->send(new SendMail($request->phone, $request->tag));
    }
}
