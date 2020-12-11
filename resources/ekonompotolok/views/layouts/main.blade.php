<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link rel="shortcut icon" href="{{ asset('ekonompotolok/images/favicon-32x32.ico')}}">
    <link href="{{ asset('/ekonompotolok/css/app.css') }}" rel="stylesheet">

</head>

<body class="antialiased">
    <div id="app">
        <router-view></router-view>
        {{-- <App environment="{{env('APP_ENV')}}"/> --}}
    </div>

    {{-- HERE Maps API --}}
    <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
    <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>

    {{-- VUE-CLI JS --}}
    <script src="{{ asset('ekonompotolok/js/app.js') }}" defer></script>

    @yield('yandex.metrika')
    @yield('gtag.js')
    @yield('pixel')

</body>

</html>
