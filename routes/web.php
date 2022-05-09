<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function(){
    return view('welcome');
});

Route::get('/login', [UserController::class, 'login'])->middleware('alreadyLoggedIn');
Route::post('/login-user', [UserController::class, 'loginUser'])->name('login-user');
Route::get('/main', [UserController::class, 'main'])->middleware('isLoggedIn');
Route::get('/logout', [UserController::class, 'logout']);





