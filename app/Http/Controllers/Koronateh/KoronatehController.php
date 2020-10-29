<?php

namespace App\Http\Controllers\Koronateh;

use App\Http\Controllers\Controller;
use App\Mail\Autoschool\SendMail;
use App\Mail\Koronateh\SendKoronatehMail;
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
        $to = env('APP_ENV') == 'local' ? env('MAIL_TO_TEST') : 'koordinator@kazmos.net';
        Mail::to($to)->send(new SendKoronatehMail($request->phone, $request->tag));
    }
}
