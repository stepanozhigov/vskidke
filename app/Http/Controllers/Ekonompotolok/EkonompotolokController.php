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
        $comments = '';
        if($request->input('comments')) {
            $comments .="Площадь: ".$request->area."; ";
            $comments.="Cвязаться по Whatsapp: " .($request->contactByWhatsapp ? "Да" : 'Нет')."; ";
            $comments.="Cвязаться по телефону: " .($request->contactByPhone ? "Да" : 'Нет')."; ";
        }

        if($request->input('location')) {
            $comments .= "IP: ".$request->ip."; ";
            $comments .= "IP-Город: ".$request->ipLocation."; ";
            $comments .= $request->geoLocation ? "Гео-Город: ".$request->geoLocation : 'нет';
        }

        $data = [
            'fields'=>[
                //Лид (стр1)
                'TITLE'=> $request->input('title'),
                //СТАТУС
                'STATUS_ID'=>env('APP_ENV') == 'local' ? 'Хлам' : '',
                //Лид (стр2)
                'SOURCE_ID'	=>env('APP_ENV') == 'local' ? 'Тест' : request()->getHttpHost(),
                //Ответственный (ID)
                'ASSIGNED_BY_ID'    =>  551,
                //Город (ID)
                'UF_CRM_1478533058' => $request->input('city'),
                //Направление (ID) (потолки)
                "UF_CRM_1467050632"=>array(56),
                // Отдел (Розница)
                "UF_CRM_1478533123" => 120,
                //Телефон
                "PHONE"=>[
                    "n0" => Array(
                        "VALUE" => $request->phone,
                        "VALUE_TYPE" => "WORK",
                    ),
                ],
                //Комментарии (ответы квиза)
                'COMMENTS'=>$comments ?? '',
                //referer (источник)
                'UF_CRM_1532516558'=>$_SERVER['HTTP_REFERER'] ?? '',

                // 
                // UTM
                // 
                
                //utm_medium
                'UF_CRM_1532512297'=>$utm['utm_medium'] ?? '',
                //utm_campaign
                'UF_CRM_1532512307'=>$utm['utm_campaign'] ?? '',
                //type
                //?
                //utm_source
                'UF_CRM_1532512285'=>$utm['utm_source'] ?? '',
                //block
                //?
                //position
                //?
                //utm_term
                'UF_CRM_1533820976'=>$utm['utm_term'] ?? '',
    
                // 
                // ROISTAT
                // 
                "UF_CRM_5D8343E788"=>$request->cookie('roistat_visit')
            ]
        ];

        $response = Http::post('https://bitrix-ts.ru/rest/578/xq4ts7jyl4q74hed/crm.lead.add.json',$data);
        return response()->json($response->json());
    }
}
