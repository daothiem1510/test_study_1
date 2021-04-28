<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Cache;

class LastUserActivity
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
        if (\Auth::check()) {
            $expiredAt = Carbon::now()->addMinute(1);
            Cache::put('user_is_online_'. \Auth::user()->id, true, $expiredAt);
        }
        return $next($request);
    }
}
