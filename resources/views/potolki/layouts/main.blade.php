<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Потолки</title>
    <link rel="icon" href="{{ asset('potolki/images/favicon-32x32.png')}}" sizes='32x32'>
    <link rel="icon" href="{{ asset('potolki/images/favicon-128x128.png')}}" sizes='128x128'>
    <link rel="icon" href="{{ asset('potolki/images/favicon-180x180.png')}}" sizes='180x180'>
    <link href="{{ mix('/potolki/css/app.css') }}" rel="stylesheet">

</head>

<body class="antialiased">

    <div id="app">
        <App />
    </div>

    {{-- VUE-CLI JS --}}
    <script src="{{ mix('potolki/js/potolki.js') }}" defer></script>

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
        fbq('init', '392934405060796');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=392934405060796&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Facebook Pixel Code -->

    
</body>

</html>