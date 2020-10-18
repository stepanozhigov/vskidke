<?php

namespace App\Http\Controllers\Potolki;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PotolkiController extends Controller
{
    public function index()

    {
        return view('potolki.app');
    }

    public function bitrix(Request $request)
    {
        //Mail::to(env('MAIL_TO_AUTOSCHOOL'))->send(new SendMail($request->phone, $request->tag));
    }
}
