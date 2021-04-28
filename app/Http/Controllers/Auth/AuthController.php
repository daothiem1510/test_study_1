<?php

namespace App\Http\Controllers\Auth;

use App\Role;
use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Repositories\UserRepository;
use Cache;

class AuthController extends Controller {

    public function __construct(UserRepository $userRepo) {
        $this->userRepo = $userRepo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLogin() {
        return view('backend.auth.login');
    }

    /**
     *
     * @param \Illuminate\Http\Request $request
     */
    public function postLogin(Request $request) {
        $input = [
            'username' => $request->get('username'),
            'password' => $request->get('password')
        ];
        if (Auth::attempt($input, true)) {
            $user = Auth::user();
            if (!$user->status) {
                return Redirect::route('login')->with('error', 'Tài khoản chưa được kích hoạt');
            }
            $user->save();
            session_start();
            $_SESSION['KCFINDER'] = []; //
            $_SESSION['KCFINDER'] = array('disabled' => false, 'uploadURL' => "/public/upload");

            if ($user->role_id == \App\Role::ROLE_ACCOUNTANT || in_array($user->role_id, Role::ROLE_STAFF_2)) {
                return Redirect::route('admin.choose_company');
            } else if(in_array('admin.department.index', $user->role->route())) {
                return Redirect::route('admin.list_department.index');
            }
            else {
                if (Auth::user()->role_id == Role::ROLE_SECURITY) {
                    return Redirect::route('admin.index');
                }else {
                    return Redirect::route('admin.index');
                }
            }
        }
        return Redirect::route('login')->with('error', 'Tài khoản hoặc mật khẩu không đúng');
    }

    /**
     *
     * @return type
     */
    public function logout() {
        if (Auth::user()) {
            Cache::forget('user_is_online_' . Auth::user()->id);
        }
        Auth::logout();
        session_start();
        unset($_SESSION);
        session_destroy();

        return Redirect::route('login');
    }

}
