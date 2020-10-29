<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Upperlicense</title>
    <link rel="icon" href="{{ asset('koronateh/images/favicon.png')}}" sizes='32x32'>
    <link href="{{ mix('/koronateh/css/app.css') }}" rel="stylesheet">

</head>

<body class="antialiased">

    <div id="app">
        <App environment="{{env('APP_ENV')}}"/>
    </div>

    {{-- VUE-CLI JS --}}
    <script src="{{ mix('koronateh/js/app.js') }}" defer></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->

    <!-- Global site tag (gtag.js) - Google Analytics -->

    <!-- Yandex.Metrika counter -->

    <!-- /Yandex.Metrika counter -->

</body>

</html>
