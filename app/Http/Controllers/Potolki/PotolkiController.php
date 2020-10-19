<?php

namespace App\Http\Controllers\Potolki;

use App\Connectors\BitrixConnector;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PotolkiController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function bitrix(Request $request)
    {
        $bitrixConnector = new BitrixConnector();

        $data = [
            'title' => 'Лидмагнит',
            'name'  =>  'Потолки',
            'phone' =>  $request->phone,
            'direction' =>  56,
            'city'  =>  528,
        ];
        $result = $bitrixConnector->addLead($data);
        return response()->json($result);
    }
}
