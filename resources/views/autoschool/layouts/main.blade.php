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

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1691132974382450');
        fbq('track', 'Просмотр страницы');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1691132974382450&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Facebook Pixel Code -->
    
</body>

</html>