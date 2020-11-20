<?php

namespace App\Http\Controllers\Ekonompotolok;

use App\Connectors\BitrixConnector;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EkonompotolokController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function bitrix24(Request $request)
    {
        $data = [
            'fields'=>[
                'SOURCE_ID'=>'Веб-сайт',
                'TITLE'=>'Ekonompotolok',
                'SOURCE_DESCRIPTION'=>'Ekonompotolok',
                'UTM_SOURCE'=>'Ekonompotolok',
                "PHONE"=> [["VALUE"=>$request->phone, "VALUE_TYPE"=> "WORK"]]
            ]
        ];
        $response = Http::post('https://bitrix-ts.ru/rest/578/xq4ts7jyl4q74hed/crm.lead.add.json',$data);
        return response()->json($response->json());
    }
}
