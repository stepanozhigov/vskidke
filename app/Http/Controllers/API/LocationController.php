<?php

namespace App\Http\Controllers\API;

use App\Connectors\BitrixConnector;
use App\Http\Controllers\Controller;
use App\Http\Requests\HereapiGetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    //GET CITY BY COORD
    public function hereapi(HereapiGetRequest $request) {
        $hereapiKey = "izLr3tzed9tqFm2ArDXT5J0FPBZHbfuztoWv7-WwU4Q";
        $response = Http::get("https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=$hereapiKey&at=$request->latitude,$request->longitude&lang=ru");
        $data = $response->json();
        return response()->json($data['items'][0],200);
    }
}
