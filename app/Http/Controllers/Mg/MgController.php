<?php

namespace App\Http\Controllers\Mg;

use App\Http\Controllers\Controller;
use App\Mail\Mg\SendMgMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class MgController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function mail(Request $request)
    {
        $to = env('APP_ENV') == 'local' ? env('MAIL_TO_TEST') : 'spa@mosgym.ru';
        Mail::to($to)->send(new SendMgMail($request->title,$request->phone));
    }
}
