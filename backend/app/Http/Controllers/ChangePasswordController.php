<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    //
    public function process(ChangePasswordRequest $request){
        if( !$this->getPasswordResetTableRow($request)->count() > 0){
            return $this->tokenNotFoundResponse();
        }
        else{
            return $this->changePassword($request);
        }
    }

    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->token
        ]);
    }

    private function tokenNotFoundResponse(){
        return response()->json([
            'error' => "Token or Email are incorrect"
        ],Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request){
        $user = User::where('email',$request->email)->first();
    }
}
