<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Корона Аренда спецтехники</title>
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
    <script type="text/javascript">
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
        ym(68785867, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    </script>
    <noscript>
        <div>
            <img src="https://mc.yandex.ru/watch/68785867"; style="position:absolute; left:-9999px;" alt="" />
        </div></noscript>
    <!-- /Yandex.Metrika counter -->

</body>

</html>
