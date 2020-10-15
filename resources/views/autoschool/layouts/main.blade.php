<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Автошкола 'Лайк'</title>
    <link rel="icon" href="{{ asset('autoschool/images/favicon-32x32.png')}}" sizes='32x32'>
    <link rel="icon" href="{{ asset('autoschool/images/favicon-128x128.png')}}" sizes='128x128'>
    <link rel="icon" href="{{ asset('autoschool/images/favicon-180x180.png')}}" sizes='180x180'>
    <link href="{{ mix('/autoschool/css/app.css') }}" rel="stylesheet">

</head>

<body class="antialiased">

    <div id="app">
        <App />
    </div>

    {{-- VUE-CLI JS --}}
    <script src="{{ mix('autoschool/js/app.js') }}" defer></script>

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
        ym(68288701, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/68288701" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
    
</body>

</html>