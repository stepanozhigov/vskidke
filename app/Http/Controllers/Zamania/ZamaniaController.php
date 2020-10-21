<?php

namespace App\Http\Controllers\Zamania;

use App\Connectors\BitrixConnector;
use App\Http\Controllers\Controller;

class ZamaniaController extends Controller
{
    public function index()

    {
        return view('app');
    }

    // public function bitrix(Request $request)
    // {
    //     $bitrixConnector = new BitrixConnector();

    //     $data = [
    //         'title' => 'Лидмагнит',
    //         'name'  =>  'Romatti',
    //         'phone' =>  $request->phone,
    //         //'direction' =>  56,
    //         'city'  =>  528,
    //     ];
    //     $result = $bitrixConnector->addLead($data);
    //     return response()->json($result);
    // }
}
