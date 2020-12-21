<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link rel="shortcut icon" href="{{ asset('romatti2/images/favicon.ico')}}">
    <link href="{{ mix('/romatti2/css/app.css') }}" rel="stylesheet">

</head>

@php
    //dd($utm);    
    //dd($referer);    
@endphp

<body class="antialiased">
    <div id="app">
        <App environment="{{env('APP_ENV')}}" :utm="{{ json_encode($utm) }}" referer="{{ $referer }}" />
    </div>

    {{-- VUE-CLI JS --}}
    <script src="{{ mix('romatti2/js/app.js') }}" defer></script>

    @yield('pixel')
    @yield('yandex.metrika')

</body>

</html>
