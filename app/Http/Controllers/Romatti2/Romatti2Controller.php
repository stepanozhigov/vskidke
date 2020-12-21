<?php

namespace App\Http\Controllers\Romatti2;

use App\Http\Controllers\Controller;
use App\Mail\Mg\SendMgMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class Romatti2Controller extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function mail(Request $request)
    {
        $to = env('APP_ENV') == 'local' ? env('MAIL_TO_TEST') : 'spa@mosgym.ru';
        Mail::to($to)->send(new SendMgMail($request->title,$request->phone));
    }

    public function bitrix24(Request $request)
    {
        $utm = $request->input('utm');
        $data = [
            'fields'=>[
                //Лид (стр1)
                'TITLE'=> $request->input('title'),
                //СТАТУС
                'STATUS_ID'=>env('APP_ENV') == 'local' ? 'Хлам' : '',
                //Лид (стр2)
                //'SOURCE_ID'	=>$request->input('utm_source') ?? env('APP_ENV') == 'local' ? 'Тест' : 'Веб-сайт',
                'SOURCE_ID'	=>'WEB',
                //Телефон
                "PHONE"=>[
                    "n0" => Array(
                        "VALUE" => $request->input('phone'),
                        "VALUE_TYPE" => "WORK",
                    ),
                ],
                //Комментарии (ответы квиза)
                //'COMMENTS'=>$comments ?? '',

                //referer (источник)
                'UF_CRM_1608543475'=>$request->input('referer') ?? '',

                //UTM
                'UTM_CAMPAIGN'=>$utm['utm_campaign'] ?? '',
                'UTM_SOURCE'=>$utm['utm_source'] ?? '',
                'UTM_CONTENT'=>$utm['utm_content'] ?? '',
                'UTM_MEDIUM'=>$utm['utm_medium'] ?? '',
                'UTM_TERM'=>$utm['utm_term'] ?? '',
            ]
        ];

        $response = Http::post('https://redzoloto.bitrix24.ru/rest/6/x04kestbu8ul91qc/crm.lead.add.json',$data);
        return response()->json($response->json());
        //return response()->json($data['fields']);
    }
}
