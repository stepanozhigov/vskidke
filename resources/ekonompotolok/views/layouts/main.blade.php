<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link rel="shortcut icon" href="{{ asset('ekonompotolok/images/favicon-32x32.ico')}}">
    <link href="{{ asset('/vsyanedvizhimost/css/app.css') }}" rel="stylesheet">

</head>

<body class="antialiased">
    <div id="app">
        <App environment="{{env('APP_ENV')}}"/>
    </div>

    {{-- VUE-CLI JS --}}
    <script src="{{ asset('ekonompotolok/js/app.js') }}" defer></script>

    @yield('yandex.metrika')
    @yield('gtag.js')
    @yield('pixel')

</body>

</html>
