<?php

namespace App\Http\Controllers\Romatti;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RomattiController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function bitrix24(Request $request)
    {
        $data = [
            'fields'=>[
                'SOURCE_ID'=>'SELF',
                'TITLE'=>'СВЕТИЛЬНИКИ',
                'SOURCE_DESCRIPTION'=>'romatti.vskidke.ru',
                'UTM_SOURCE'=>'trendPro',
                "PHONE"=> [["VALUE"=>$request->phone, "VALUE_TYPE"=> "WORK"]]
            ]
        ];
        $response = Http::post('https://romatti.bitrix24.ru/rest/7519/hq211ydndfikozas/crm.lead.add',$data);
        return response()->json($response->json());
    }
}
