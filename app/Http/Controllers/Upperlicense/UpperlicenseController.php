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

    public function bitrix24(Request $request)
    {
        $data = [
            'fields'=>[
                'SOURCE_ID'=>'SELF',
                'TITLE'=>'ХЕЛОУИН',
                'SOURCE_DESCRIPTION'=>'zamania.vskidke.ru',
                'UTM_SOURCE'=>'trendPro',
                "PHONE"=> [["VALUE"=>$request->phone, "VALUE_TYPE"=> "WORK"]]
            ]
        ];
        $response = Http::post('https://b24.zamania.ru/rest/4769/tlypdtk47mxjpkgk/crm.lead.add',$data);
        return response()->json($response->json());
    }
}
