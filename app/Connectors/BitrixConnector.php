<?php

namespace App\Connectors;

class BitrixConnector
{
    protected $url = 'https://bitrix-ts.ru:443/crm/configs/import/lead.php';
    protected $login = 'leads_tp';
    protected $password = 'df%C8Bo0tY!';
    protected $requestData = '';
    protected $visits = [];

    public function __construct(array $visits = null)
    {
        $this->visits = $visits;
    }

    protected function getVisitParam($param)
    {
        $value = null;

        foreach ($this->visits as $visit) {
            if (!empty($visit[$param])) {
                $value = $visit[$param];
            }
        }
        return $value;
    }

    protected function openConnection($url, $arFields)
    {
        $curl = \curl_init($url);

        $queryFields = [
            'LOGIN' =>  $this->login,
            'PASSWORD'  =>  $this->password
        ];

        \curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER  =>  true,
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => http_build_query($queryFields + $arFields)
        ]);

        return $curl;
    }

    public function addLead($data)
    {
        $this->visits = $data['visits'] ?? [];
        info($this->visits);
        $data = [
            'TITLE' =>  $data['title'],
            'NAME'  =>  $data['name'],
            'SOURCE_ID' =>  $data['source'] ?? '',
            'PHONE_MOBILE' =>  str_replace(['+7', ' ', '-', '(', ')'], ['8', ''], $data['phone'] ?? ''),
            //'COMMENTS'   =>  $data['comment'] ?? "",
            'UF_CRM_1478533058' => $data['city'] ?? '',
            'ASSIGNED_BY_ID'    =>  551,
            'UF_CRM_1467050632' =>  $data['direction'] ?? '',
            //'UF_CRM_CT_UTM_SOUR'    =>  'asdas',
            'UTM_SOURCE'    =>  'testasd',
            'WEB'   =>  'potolki-ts.ru',
            // 'SOURCE_DESCRIPTION'    =>  $data['description'] ?? '',
            // 'UF_CRM_5D8343E788'	=>	$data['roistat'] ?? '',
            // 'UF_CRM_1532512285' => request()->get('utm_source') ?? $this->getVisitParam('utm_source'),
            // 'UF_CRM_1532512297' => request()->get('utm_medium') ?? $this->getVisitParam('utm_medium'),
            // 'UF_CRM_1532512307' => request()->get('utm_campaign') ?? $this->getVisitParam('utm_campaign'),
            // 'UF_CRM_1533820950' => request()->get('utm_content') ?? $this->getVisitParam('utm_content'),
            // 'UF_CRM_1533820976' => request()->get('utm_term') ?? $this->getVisitParam('utm_term'),
            // 'UF_CRM_1533821072' => request()->get('adposition') ?? $this->getVisitParam('adposition'),
            // 'UF_CRM_1533821003' => request()->get('placement') ?? $this->getVisitParam('placement'),
            // 'UF_CRM_1533821112' => request()->get('keyword') ?? $this->getVisitParam('keyword'),
            // 'UF_CRM_1532516558' => request()->get('referer') ?? $this->getVisitParam('referer')
        ];

        $connection = $this->openConnection('https://bitrix-ts.ru:443/crm/configs/import/lead.php', $data);

        $result = \curl_exec($connection);

        return $result;
    }
}
