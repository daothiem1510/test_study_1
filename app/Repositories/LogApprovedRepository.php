<?php

namespace Repositories;

use Repositories\Support\AbstractRepository;

class LogApprovedRepository extends AbstractRepository {

    public function __construct(\Illuminate\Container\Container $app) {
        parent::__construct($app);
    }

    public function model() {
        return 'App\LogApproved';
    }
    public function getAll($search){
        $query = $this->model;
        if(isset($search['start_date'])){
            $query = $query->whereDate('created_at','>=',$search['start_date'])
                ->whereDate('created_at','<=',$search['end_date']);
        }
        if(isset($search['module'])){
            $query = $query->whereRaw("module REGEXP '[[:<:]]".$search['module']."[[:>:]]'");
        }
        $query = $query->orderBy('created_at','DESC')->get();
        return $query;
    }
}
