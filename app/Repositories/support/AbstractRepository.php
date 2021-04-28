<?php

namespace Repositories\Support;

use App\Route;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as App;
use Validator;

abstract class AbstractRepository {

    private $app;
    protected $model;

    public function __construct(App $app) {
        $this->app = $app;
        $this->makeModel();
    }
    abstract function model();

    public function makeModel() {
        $model = $this->app->make($this->model());
        if (!$model instanceof Model) {
            throw new RepositoryException("Class {$this->model()} must be an instance of Illuminate\\Database\\Eloquent\\Model");
        }
        return $this->model = $model;
    }

    /**
     * @param array $columns
     * @return mixed
     */
    public function all($columns = array('*')) {
        return $this->model->orderBy('created_at', 'DESC')->get($columns);
    }

    public function allOrder($columns = array('*')) {
        return $this->model->orderBy('order', 'ASC')->orderBy('created_at', 'DESC')->get($columns);
    }

    public function selectArr() {
        $arr = [];
        $models = self::all();
        foreach ($models as $model) {
            $arr[$model->id] = $model->name;
        }
        return $arr;
    }

    protected function queryAll() {
        return $this->model;
    }

    /**
     * @param int $perPage
     * @param array $columns
     * @return mixed
     */
    public function paginate($request = null, $perPage = 15, $columns = array('*')) {
        $query = $this->queryAll();
        if ($request !== NULL) {
            $sortBy = $request->get('sortBy');
            $orderBy = $request->get('orderBy');
            $searchBy = $request->get('searchBy');
            $searchText = $request->get('searchText');
            if (!is_null($sortBy) && $this->checkColumn($sortBy)) {
                $orderBy = in_array($orderBy, ['asc', 'desc']) ? $orderBy : 'asc';
                $query = $query->orderBy($sortBy, $orderBy);
            }
            if (!is_null($searchBy) && $this->checkColumn($searchBy)) {
                $query = $query->where($searchBy, 'LIKE', "%$searchText%");
            }
        }
        return $query->orderBy('id', 'DESC')->paginate($perPage, $columns);
    }

    /**
     * Delete a Eloquent model
     * @param $id
     * @return mixed
     */
    public function delete($id) {
        $model = $this->model->find($id);
        \DB::table('log')->insert(array('route' => \Illuminate\Support\Facades\Route::currentRouteName(), 'user_id'=> \Auth::user()?\Auth::user()->id:0, 'created_at' => date('Y-m-d H:i:s'), 'item_id' => $id, 'model' => $this->model()));
        $model->delete();
    }

    /**
     * @param $id
     * @param array $columns
     * @return mixed
     */
    public function find($id, $columns = array('*')) {
        return $this->model->find($id, $columns);
    }
    public function WhereBy($attribute, $value, $columns = array('*')) {
       return $this->model->where($attribute, '=', $value)->get();
    }

    /**
     * @param $attribute
     * @param $value
     * @param array $columns
     * @return mixed
     */
    public function findBy($attribute, $value, $columns = array('*')) {
        return $this->model->where($attribute, '=', $value)->first($columns);
    }
    public function clean(array $data, array $unsetList = [], array $checkboxs = []) {
        foreach ($unsetList as $u) {
            unset($data[$u]);
        }

        unset($data['_method']);
        unset($data['_token']);

        foreach ($checkboxs as $checkbox) {
            if (!isset($data[$checkbox])) {
                $data[$checkbox] = 0;
            }
        }
        return $data;
    }

    function generateRandomString($code, $length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' . $code;
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    protected function getTableColumns() {
        $modelColumns = $this->model->getTableColumns();
        return $modelColumns;
    }

    protected function checkColumn($col) {
        if (in_array($col, $this->getTableColumns())) {
            return true;
        } else {
            return false;
        }
    }

    public function create(array $data) {
        $model = $this->model->create($data);
       // \DB::table('log')->insert(array('route' => \Illuminate\Support\Facades\Route::currentRouteName(), 'user_id'=> \Auth::user()?\Auth::user()->id:0, 'created_at' => date('Y-m-d H:i:s'), 'item_id' => $model->id, 'model' => $this->model()));
        return $model;
    }

    /**
     * @param array $data
     * @param $id
     * @param string $attribute
     * @return mixed
     */
    public function update(array $data, $id) {
        $model = true;
        if (isset($data)) {
            $model = $this->model->find($id)
                    ->update($data);
        }
        \DB::table('log')->insert(array('route' => \Illuminate\Support\Facades\Route::currentRouteName(), 'user_id'=> \Auth::user()?\Auth::user()->id:0, 'created_at' => date('Y-m-d H:i:s'), 'item_id' => $id,'model' => $this->model()));
        return $model;
    }
    public function updateByCondition(array $data, $condition) {
        $model = true;
        if (isset($data)) {
            $model = $this->model->where($condition)
                ->update($data);
        }
        \DB::table('log')->insert(array('route' => \Illuminate\Support\Facades\Route::currentRouteName(), 'user_id'=> \Auth::user()?\Auth::user()->id:0, 'created_at' => date('Y-m-d H:i:s'), 'item_id' => 0, 'model' => $this->model()));
        return $model;
    }
    public function weekdays() {
        return array(
            1 => trans('base.monday'),
            2 => trans('base.tuesday'),
            3 => trans('base.wednesday'),
            4 => trans('base.wednesday'),
            5 => trans('base.thursday'),
            6 => trans('base.friday'),
            7 => trans('base.saturday'),
            8 => trans('base.sunday'),
        );
    }

    public function toggle($id, $field = 'status') {
        $model = $this->find($id);
        $this->model->where('id', '=', $id)->update([$field => (string)(1 - ($model->$field))]);
        \DB::table('log')->insert(array('route' => \Illuminate\Support\Facades\Route::currentRouteName(), 'user_id'=> \Auth::user()?\Auth::user()->id:0, 'created_at' => date('Y-m-d H:i:s'), 'item_id' => $id, 'model' => $this->model()));
        return true;
    }
}
