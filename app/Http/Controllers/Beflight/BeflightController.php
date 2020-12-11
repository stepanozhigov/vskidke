<?php

namespace App\Http\Controllers\Beflight;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class BeflightController extends Controller
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
            //'email' => $request->email,
            // 'contact_fields' => [
            //     'geo_location' => $request->geoLocation,
            //     'ip_location' => $request->ipLocation
            // ]
        ]);
        if ($response->successful()) {
            return response()->json($response->json());
        } elseif ($response->failed() || $response->clientError() || $response->serverError()) {
            return response()->json($response->throw()->json());
        }
    }
}
