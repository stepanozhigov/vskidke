<?php

namespace App\Http\Potolki\Controllers;

use App\Connectors\BitrixConnector;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BitrixController extends Controller
{
    public function addLead(Request $request)
    {
        $bitrixConnector = new BitrixConnector();

        $data = [
            'title' => 'Лидмагнит',
            'name'  =>  'Потолки',
            'phone' =>  $request->phone,
            // 'direction' =>  56,
            'city'  =>  528,
        ];
        dd($data);
        $bitrixConnector->addLead($data);
    }
}
