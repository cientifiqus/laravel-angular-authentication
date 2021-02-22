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
        return $user;
    }
}
