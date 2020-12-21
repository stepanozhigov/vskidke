<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class getUtmFromVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $utm = [
            'utm_campaign'=>$request->query('utm_campaign',''),
            'utm_source'=>$request->query('utm_source',''),
            'utm_term'=>$request->query('utm_term',''),
            'utm_medium'=>$request->query('utm_medium',''),
            'utm_content'=>$request->query('utm_content',''),
        ];
        View::share('utm',$utm);
        return $next($request);
    }
}
