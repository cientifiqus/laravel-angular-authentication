<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class DeleteUserController extends Controller
{
    //
    public function deleteUser(DeleteUserRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        $user->delete();//delete the user...
        /*$user->update($request->all());
        error_log("****************************", 0);
        $a = print_r($request->all(), true);
        error_log($a, 0);
        error_log("****************************", 0);*/
        return $user;
    }
}
