<?php

use App\Http\Controllers\HomeController;
use illuminate\Support\Facades\Route;

//Rute jika sudah masuk ke aplikasi
route::group(['prefix' => 'home', 'middleware' => 'isLogin'], function(){
    route::get('/', [HomeController::class, 'homeIndex'])->name('home');
});
