<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

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
        $token = $this->createToken($email);//to me used on password_resets table and be validaded on reset email sent to user...
        Mail::to($email)->send(new ResetPasswordMail($token));
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

    public function createToken($email){
        $oldToken = DB::table('password_resets')->where('email',$email)->first();
        if($oldToken){
            return $oldToken;
        }
        $token = Str::random(60);
        $this->saveToken($token, $email);
        return  $token;
    }

    public function saveToken($token,$email){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
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
