<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $table = 'route';
    protected $fillable = [
        'role_id','route','is_default'
    ];
}
