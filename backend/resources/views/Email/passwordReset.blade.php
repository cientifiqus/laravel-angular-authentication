@component('mail::message')
# Change password Request

Click on the button below to change the password of Laravel+angular.

@component('mail::button', ['url' => "http://localhost:4200/response-passwrod-reset?token={$token->token}"])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
