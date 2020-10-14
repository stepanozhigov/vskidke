<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $response = Http::asForm()->post('http://amoconnect.ru/amo-ipravo/api/slug/lmr-ifinance', [
            'url' => $request->url,
            'phone' => $request->phone,
            'email' => $request->email,
            'contact_fields' => [
                'geo_location' => $request->geoLocation,
                'ip_location' => $request->ipLocation
            ]
        ]);
        if ($response->successful()) {
            return response()->json($response->json());
        } elseif ($response->failed() || $response->clientError() || $response->serverError()) {
            return response()->json($response->throw()->json());
        }
    }
}
