<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $response = Http::post('http://amoconnect.ru/amo-ipravo/api/slug/lmr-ifinance', [
            'url' => $request->url,
            'phone' => $request->phone,
            'email' => $request->email,
            'geoLocation' => $request->geoLocation,
            'ipLocation' => $request->ipLocation

        ]);
        return response()->json($response);
    }
}
