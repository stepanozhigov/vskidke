@extends('layouts.main')

@section('title')
Заказать натяжные потолки от производителя | Эконом Потолок
@endsection


@section('yandex.metrika')
    <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(48259676, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true }); </script>
    <noscript>
        <div><img src="https://mc.yandex.ru/watch/48259676" style="position:absolute; left:-9999px;" alt="" /></div>
    </noscript>
@endsection

@section('gtag.js')
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-85472546-9"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-85472546-9');
    </script>
@endsection

@section('pixel')
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
        fbq('init', '372078400739217');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=372078400739217&ev=PageView&noscript=1";
    /></noscript>
    <!-- End Facebook Pixel Code -->
@endsection
