<?php

namespace App\Http\Controllers\Vsyanedvizhimost;

use App\Http\Controllers\Controller;
use App\Mail\Autoschool\SendMail;
use App\Mail\Vsyanedvizhimost\SendVsyanedvizhimostMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class VsyanedvizhimostController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function mail(Request $request)
    {
        $to = env('APP_ENV') == 'local' ? env('MAIL_TO_TEST') : 'Belugin.d@trackergroup.ru';
        Mail::to($to)->send(new SendVsyanedvizhimostMail($request->phone, $request->tag));
    }
}
