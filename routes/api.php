<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\EhorController;

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
Route::get('/logout', [UserController::class, 'logout'])->name('logout');
Route::get('/profile', [PageController::class, 'profile'])->middleware('isLoggedIn')->name('profile');
Route::get('/edit-profile/{id}', [PageController::class, 'editprofile'])->middleware('isLoggedIn')->name('edit-profile');
Route::get('/user', [PageController::class, 'manageuser'])->middleware('isLoggedIn');
Route::get('/delete/{id}', [UserController::class, 'delete'])->name('delete');
Route::post('/add', [UserController::class, 'add'])->name('add');
Route::post('/update', [UserController::class, 'update'])->name('update');
Route::get('/search', [UserController::class, 'search'])->name('search');
Route::get('/ehor', [PageController::class, 'ehor'])->middleware('isLoggedIn')->name('ehor');
//Route For Location of Occurrence Customization
Route::get('/deletelocation/{id}', [EhorController::class, 'deletelocation'])->name('deletelocation');
Route::post('/addlocation', [EhorController::class, 'addlocation'])->name('addlocation');
Route::post('/updatelocation', [EhorController::class, 'updatelocation'])->name('updatelocation');
//Route For Site of Occurrence Customization
Route::get('/deletesite/{id}', [EhorController::class, 'deletesite'])->name('deletesite');
Route::post('/addsite', [EhorController::class, 'addsite'])->name('addsite');
Route::post('/updatesite', [EhorController::class, 'updatesite'])->name('updatesite');
//Route For Type of Occurrence Customization
Route::post('/filtertype', [EhorController::class, 'filtertype'])->name('filtertype');
Route::get('/deletetype/{id}', [EhorController::class, 'deletetype'])->name('deletetype');
Route::post('/addtype', [EhorController::class, 'addtype'])->name('addtype');
Route::post('/updatetype', [EhorController::class, 'updatetype'])->name('updatetype');


