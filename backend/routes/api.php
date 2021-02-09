<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
Route::post('/signup', 'App\Http\Controllers\AuthController@signup');
Route::get('/isAuthenticated', 'App\Http\Controllers\AuthController@isAuthenticated');
Route::get('/initialValue', 'App\Http\Controllers\InitialValueController@index');
Route::resource('user', 'App\Http\Controllers\UserController');
Route::put('task/{id}/state', 'App\Http\Controllers\TaskController@updateState')->middleware('auth:sanctum');
Route::resource('task', 'App\Http\Controllers\TaskController')->middleware('auth:sanctum');
Route::resource('outputText', 'App\Http\Controllers\OutputTextController')->middleware('auth:sanctum');
Route::get('/state', 'App\Http\Controllers\StateController@index');
Route::get('fail_login', function () {
    return response()->json([], 401);
})->name('fail_login');
