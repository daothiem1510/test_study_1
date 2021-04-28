<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Word extends Model {

    //
    protected $table = 'word';
    protected $fillable = [
        'word', 'type','means','image','level_id'
    ];

    public function detail() {
        return $this->hasMany('\App\WordDerail');
    }
    public function level() {
        return $this->belongsTo('\App\Level');
    }
}
