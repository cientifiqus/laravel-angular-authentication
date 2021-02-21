<hr>
<h1>About Laravel+angular Project</h1>
<hr>

<h2>About</h2>
This a project for testing and learning Laravel+angular using JWT authentication method and MVC client->server model.

<p>Based on Udemy course for JWT authentication <a href="https://github.com/bitfumes/laravel-angular-authentication">Github</a> <a href="https://www.udemy.com/course/angular-laravel-single-page-app-with-authentication-and-password-reset/">Udemy Course</a> </p>

<p>Created by <a href="https://www.linkedin.com/in/damh/">Daniel A Montoya </a></p>
<p>Web: <a href=" www.montolla.tk">www.montolla.tk</a></p>

<h2>Users module</h2>

<p>The users module has a complete CRUD so you can create (singup), read (login) update and delete the user from the Frontend</p>

<p>At the backend, you have the necesary API calls for the CRUD and also the JWT token handle embeded.</p>

<p>Some API calls to the backend needs authorization using JWT token</p>

<h2>Server</h2>

<p>It is expected that the bakcend is located at http://127.0.0.1:8000 and the frontend at http://localhost:4200/ but this last one it is optional.</p>

<p>Also, it is necesary that the backend server has CORS properly setup so the frontend can call it for API consume...</p>

<h2>Password Reset</h2>
In order to use rest password functionality, you need to set the email server first with this settings:
<pre>
/**
* Use this service to test http://mailtrap.io/.....
* Over .env set this settings
* MAIL_HOST=smtp.mailtrap.io
* MAIL_USERNAME=357f3605c3eed9
* MAIL_PASSWORD=a424605aaff236
* MAIL_ENCRYPTION=tls
* MAIL_FROM_ADDRESS="sysadmin@Laravel_plus_angular.io"
*/
</pre>

<hr>

<h2>Frontend</h2>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<hr>

<h2>backend</h2>

<p><br><p>
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
