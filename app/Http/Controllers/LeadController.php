<?php

namespace App\Http\Controllers;

use App\Mail\Autoschool\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        Mail::to(env('MAIL_FROM_AUTOSCHOOL'))->send(new SendMail($request->phone, $request->tag));
    }
}
