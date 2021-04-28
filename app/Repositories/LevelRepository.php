<?php

namespace Repositories;

use Illuminate\Support\Facades\DB;
use Repositories\Support\AbstractRepository;

class LevelRepository extends AbstractRepository {

    public function __construct(\Illuminate\Container\Container $app) {
        parent::__construct($app);
    }

    public function model() {
        return 'App\Level';
    }



}
