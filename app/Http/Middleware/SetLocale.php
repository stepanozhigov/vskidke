<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\View;

class setLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $host = $request->server->get('HTTP_HOST');
        $pattern = "/(.*)\.vskidke\.(.*)/";

        preg_match($pattern, $host, $subdomain);
        $subdomain = count($subdomain) > 0 ? $subdomain[1] : '';
        switch ($subdomain) {
            case 'lmr':
                app()->setLocale('ru');
                break;
            case 'lme':
                app()->setLocale('en');
                break;
            default:
                app()->setLocale('en');
                break;
        }
        return $next($request);
    }
}
