<?php

namespace App\Http\Controllers;

use App\Connectors\BitrixConnector;
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
