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

    //GET CITY BY IP
    public function ipapi(Request $request) {
        
        $query = [
            'api-key' => "0075d631068f9ce6f45736561dd4b0b18eb4b4c83ffac03f3c523bae",
            'lang'=>'ru',
        ];
        $response = Http::get("http://ip-api.com/json/".$request->ip."?".http_build_query($query));
        $data = $response->json();
        return response()->json($data['regionName'],200);
    }
}
