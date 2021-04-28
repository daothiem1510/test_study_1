<?php

use Illuminate\Http\Request;

Route::get('/search', 'Api\BackendController@search');
Route::get('/create_chapter', 'Api\BackendController@createChapter');

