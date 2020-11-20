<?php
//use App\Http\Requests\Request;
//dd(resource_path(explode('.', request()->getHost())[0]) . '/views');
$host_parts = preg_split("/[\s.]+/", $_SERVER['HTTP_HOST']);
$subdomain = $host_parts[0] == 'www' ? $host_parts[1] : $host_parts[0];

//vsyanedvizhimost (xn----ctbbheinb0bds0ako4m9a)
if($subdomain == 'xn----ctbbheinb0bds0ako4m9a') $subdomain = 'vsyanedvizhimost';
//ekonompotolok (xn----stbbddfgbcabi4bzk)
if($subdomain == 'xn----stbbddfgbcabi4bzk') $subdomain = 'ekonompotolok';
//dd($subdomain);

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'paths' => [
        resource_path($subdomain) . '/views',
    ],
    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */

    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),

];
