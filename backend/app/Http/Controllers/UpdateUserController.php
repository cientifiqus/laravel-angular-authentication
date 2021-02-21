<?php

namespace App\Http\Controllers;

use App\Http\Requests\updateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UpdateUserController extends Controller
{
    //
    public function updateUser(updateUserRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        $user->update($request->all());
        error_log("****************************", 0);
        $a = print_r( $request->all() ,true);
        error_log( $a, 0);
        error_log("****************************", 0);
        return $user;
    }
}
