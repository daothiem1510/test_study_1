<?php

namespace App\Http\Middleware;

use Closure;

class IpMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public $restrictIps = ['127.0.0.1', '14.188.153.243', '22.72.73.119','1.54.194.134','118.70.233.226', '171.245.28.189','42.116.153.213','27.68.35.89', '115.77.239.71','113.160.97.160', '113.181.114.248','116.97.86.6', '14.163.68.57', '27.75.62.178','14.162.178.106','27.68.37.59'];
    public function handle($request, Closure $next)
    {
//        if (!in_array($request->ip(), $this->restrictIps)) {
//            return response()->json(["Sorry! You don't have permission to access this application.'"]);
//        }

        return $next($request);
    }
}
