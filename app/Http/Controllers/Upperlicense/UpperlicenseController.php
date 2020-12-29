<?php

namespace App\Http\Controllers\Upperlicense;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UpperlicenseController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function ammoconnect(Request $request)
    {
        $response = Http::asForm()->post('http://amoconnect.ru/amo-ipravo/api/slug/upperlicense-vskidke-ru', [
            'url' => $request->url,
            'phone' => $request->phone,
            'lead_comment'=>$request->input('lead_comment',''),
            'utm' => $request->utm,
            'contact_fields' => [
                'geo_location' => $request->geoLocation,
                'ip_location' => $request->ipLocation
            ]
        ]);
        if ($response->successful()) {
            return response()->json($response->json());
        } elseif ($response->failed()) {
            return response()->json($response->throw()->json());
        }
    }
}
