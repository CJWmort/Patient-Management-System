<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/login', [UserController::class, 'login'])->middleware('alreadyLoggedIn');
Route::post('/login-user', [UserController::class, 'loginUser'])->name('login-user');
Route::get('/main', [UserController::class, 'main'])->middleware('isLoggedIn')->name('home');
Route::get('/logout', [UserController::class, 'logout']);
Route::get('/profile', [PageController::class, 'profile'])->middleware('isLoggedIn');
Route::get('/edit-profile/{id}', [PageController::class, 'editprofile'])->middleware('isLoggedIn');
Route::get('/password', [PageController::class, 'password'])->middleware('isLoggedIn');
Route::get('/user', [PageController::class, 'manageuser'])->middleware('isLoggedIn');
Route::get('/delete/{id}', [UserController::class, 'delete'])->name('delete');


