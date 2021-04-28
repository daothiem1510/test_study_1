<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model {

    //
    protected $table = 'level';
    protected $fillable = [
        'name','chapter_id'
    ];

    public function chapter() {
        return $this->belongsTo('\App\Chapter','chapter_id');
    }
}
