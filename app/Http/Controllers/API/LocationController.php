<?php

namespace App\Http\Controllers\API;

use App\Connectors\BitrixConnector;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    //GET CITY BY COORD
    //(latitude,longitude)
    public function hereapi(Request $request) {
        $hereapiKey = "izLr3tzed9tqFm2ArDXT5J0FPBZHbfuztoWv7-WwU4Q";
        return response()->json($request->all(),200);
    }
}
