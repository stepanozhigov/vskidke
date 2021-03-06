<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Парк Zамания в Москве</title>
    <link rel="shortcut icon" type="image/png" href="{{ asset('zamania/images/favicon-32x32.png')}}">
    <link href="{{ asset('/zamania/css/app.css') }}" rel="stylesheet">

</head>

<body class="antialiased">

    <div id="app">
    <App environment="{{env('APP_ENV')}}"/>
    </div>

    {{-- VUE-CLI JS --}}
    <script src="{{ asset('zamania/js/app.js') }}" defer></script>

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
        fbq('init', '352980549362090');
        fbq('track', 'PageView');
   </script>
   <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=352980549362090&ev=PageView&noscript=1";
   /></noscript>
   <!-- End Facebook Pixel Code -->

   <!--  -->
   <script>
    (function(w,d,u){
      var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
      var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
    })(window,document,'https://b24.zamania.ru/upload/crm/tag/call.tracker.js');
  </script>
  <!--  -->

</body>

</html>
