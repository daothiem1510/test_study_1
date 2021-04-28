<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model {

    //
    protected $table = 'chapter';
    protected $fillable = [
        'name','content'
    ];

    public function level() {
        return $this->hasMany('\App\Level');
    }
}
