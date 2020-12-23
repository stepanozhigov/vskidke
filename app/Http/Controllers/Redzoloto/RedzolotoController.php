<?php

namespace App\Http\Controllers\Redzoloto;

use App\Http\Controllers\Controller;
use App\Mail\Mg\SendMgMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class RedzolotoController extends Controller
{
    public function index()

    {
        return view('app');
    }

    public function bitrix24(Request $request)
    {

        //redzoloto
        //$response = Http::post('https://redzoloto.bitrix24.ru/rest/6/x04kestbu8ul91qc/crm.lead.add.json',$data);
        //ours
        //$webhook = 'https://bitrix-ts.ru/rest/578/xq4ts7jyl4q74hed/';
        $webhook = 'https://redzoloto.bitrix24.ru/rest/6/x04kestbu8ul91qc/';

        $utm = $request->input('utm');
        $data = [
            'fields'=>[
                //Лид (стр1)
                'TITLE'=> $request->input('title'),
                //СТАТУС
                'STATUS_ID'=>env('APP_ENV') == 'local' ? 'JUNK' : '',
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

                //CONTACT
                'CONTACT_ID'=>'',

                //UTM
                'UTM_CAMPAIGN'=>$utm['utm_campaign'] ?? '',
                'UTM_SOURCE'=>$utm['utm_source'] ?? '',
                'UTM_CONTENT'=>$utm['utm_content'] ?? '',
                'UTM_MEDIUM'=>$utm['utm_medium'] ?? '',
                'UTM_TERM'=>$utm['utm_term'] ?? '',
            ]
        ];

        //create with contact 482664

        //get contact 482664
        $contact_response = Http::post($webhook.'crm.contact.list.json',[
            'filter' => ['PHONE'=>$request->input('phone')] 
        ]);

        if($contact_response->successful()) {
            //create lead with existing contact
            if(count($contact_response->json()['result'])>0) {
                $contact = $contact_response->json()['result'][0];
                $contact_id = intval($contact['ID']);
                $data['CONTACT_ID'] = $contact_id;
                $create_response = Http::post($webhook.'crm.lead.add.json',$data);
            }
            else {
                 //create lead with new client
                $create_response = Http::post($webhook.'crm.lead.add.json',$data);
             }

             //response
            if($create_response->successful()) {
                return response()->json($create_response->json(),201);
            } else {
                return response()->json(['error'=>'Повторите заявку'], 400);
            }

        } else {
            return response()->json(['error'=>'Повторите заявку'], 400);
        }
    }
}
