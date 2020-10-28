<?php

namespace App\Http\Controllers\Koronateh;

use App\Http\Controllers\Controller;
use App\Mail\Autoschool\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class KoronatehController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function mail(Request $request)
    {
        Mail::to('koordinator@kazmos.net')->send(new SendMail($request->phone, $request->tag));
    }
}
