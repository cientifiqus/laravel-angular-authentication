
<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
], function () {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('signup', 'App\Http\Controllers\AuthController@signup');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    Route::post('sendPasswordResetLink', 'App\Http\Controllers\ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'App\Http\Controllers\ChangePasswordController@process');
});

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::post('retrieveUser', function (Request $request) {
        return $request->user();
    });
    Route::post('updateUser', 'App\Http\Controllers\UpdateUserController@updateUser');
    Route::post('deleteUser', 'App\Http\Controllers\DeleteUserController@deleteUser');
    Route::post('CategoryCreate', 'App\Http\Controllers\CategoryController@CategoryCreate');
    Route::post('retrieveCategories', 'App\Http\Controllers\CategoryController@retrieveCategories');
    Route::post('editCategory', 'App\Http\Controllers\CategoryController@editCategory');
    Route::post('getCategory', 'App\Http\Controllers\CategoryController@getCategory');
    Route::post('deleteCategory', 'App\Http\Controllers\CategoryController@deleteCategory');
});

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
