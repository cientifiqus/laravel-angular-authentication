<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    //
    public function sendEmail(Request $request){
        //return $request->all();
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }

    public  function send($email){
        Mail::to($email)->send(new ResetPasswordMail);
        /**
         * Use this service to test http://mailtrap.io/.....
         * Over .env set this settings
         * MAIL_HOST=smtp.mailtrap.io
         * MAIL_USERNAME=357f3605c3eed9
         * MAIL_PASSWORD=a424605aaff236
         * MAIL_ENCRYPTION=tls
         * MAIL_FROM_ADDRESS="sysadmin@Laravel_plus_angular.io"
         */
    }

    public function validateEmail($email){
        return !!User::where('email',$email)->first();//in order to return boolean here, use dobule !! at the beggining
    }

    public function failedResponse(){
        return response()->json([
            'error' => "Email doesn't exists on our database"
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => "Reset Emails was send successfully, please check your inbox mail"
        ], Response::HTTP_OK);
    }
}
