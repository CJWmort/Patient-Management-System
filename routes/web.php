<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\EhorController;
use App\Http\Controllers\Chart8Controller;
use App\Http\Controllers\Chart10aController;
use App\Http\Controllers\Chart10bController;
use App\Http\Controllers\Chart10cController;
use App\Http\Controllers\Chart11aController;
use App\Http\Controllers\Chart11bController;
use App\Http\Controllers\Chart11cController;
use App\Http\Controllers\Chart11dController;
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
//Route For User Controller
Route::get('/login', [UserController::class, 'login'])->middleware('alreadyLoggedIn');
Route::post('/login-user', [UserController::class, 'loginUser'])->name('login-user');
Route::get('/main', [UserController::class, 'main'])->middleware('isLoggedIn')->name('home');
Route::get('/logout', [UserController::class, 'logout'])->name('logout');
Route::get('/delete/{id}', [UserController::class, 'delete'])->name('delete');
Route::post('/add', [UserController::class, 'add'])->name('add');
Route::post('/update', [UserController::class, 'update'])->name('update');
Route::get('/search', [UserController::class, 'search'])->name('search');

//Route For Page Controller
Route::get('/profile', [PageController::class, 'profile'])->middleware('isLoggedIn')->name('profile');
Route::get('/edit-profile/{id}', [PageController::class, 'editprofile'])->middleware('isLoggedIn')->name('edit-profile');
Route::get('/user', [PageController::class, 'manageuser'])->middleware('isLoggedIn')->name('user');
Route::get('/ehor', [PageController::class, 'ehor'])->middleware('isLoggedIn')->name('ehor');
Route::get('/reports', [PageController::class, 'reports'])->middleware('isLoggedIn')->name('reports');

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

//Route For Chart Controller
Route::get('/chart8', [Chart8Controller::class, 'chart8'])->middleware('isLoggedIn')->name('chart8');
Route::get('/chart10a', [Chart10aController::class, 'chart10a'])->middleware('isLoggedIn')->name('chart10a');
Route::get('/chart10b', [Chart10bController::class, 'chart10b'])->middleware('isLoggedIn')->name('chart10b');
Route::get('/chart10c', [Chart10cController::class, 'chart10c'])->middleware('isLoggedIn')->name('chart10c');
Route::get('/chart11a', [Chart11aController::class, 'chart11a'])->middleware('isLoggedIn')->name('chart11a');
Route::post('/editData', [Chart11aController::class, 'editData'])->name('editData');
Route::get('/chart11b', [Chart11bController::class, 'chart11b'])->middleware('isLoggedIn')->name('chart11b');
Route::get('/chart11c', [Chart11cController::class, 'chart11c'])->middleware('isLoggedIn')->name('chart11c');
Route::get('/chart11d', [Chart11dController::class, 'chart11d'])->middleware('isLoggedIn')->name('chart11d');