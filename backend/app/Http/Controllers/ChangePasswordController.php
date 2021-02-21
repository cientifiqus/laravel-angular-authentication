<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class ChangePasswordController extends Controller
{
    //
    public function process(ChangePasswordRequest $request){
        if( !$this->getPasswordResetTableRow($request)->count() > 0){
            return $this->tokenNotFoundResponse($request);
        }
        else{
            return $this->changePassword($request);
        }
    }

    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }

    private function tokenNotFoundResponse($request){
        return response()->json([
            'error' => "Token or Email are incorrect"
        ],Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request){
        $user = User::where('email',$request->email)->first();
        $user->update([
            'password' => $request->password
        ]);
        $this->getPasswordResetTableRow($request)->delete();//delete the token request on password_resets table
        return response()->json([
            'data' => "Successfully changed Password"
        ], Response::HTTP_CREATED);
    }
}
