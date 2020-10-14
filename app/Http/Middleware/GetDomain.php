<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class GetDomain
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
        $host = $request->server->get('HTTP_HOST');
        $pattern = "/(.*)\.vskidke\.(.*)/";

        preg_match($pattern, $host, $subdomain);
        $subdomain = count($subdomain) > 0 ? $subdomain[1] : '';
        dd($subdomain);

        return $next($request);
    }
}
