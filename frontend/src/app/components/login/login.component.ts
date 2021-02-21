import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public menssage= '';

  public error = {
    email: '',
    password: '',
    message: ''
  };

  constructor(
    private Jarwis: JarwisService,
    private Token:TokenService,
    private router: Router,
    private Auth: AuthService,
    private Snotify: SnotifyService
  ) { }

  onSubmit() {
    this.error = {
      email: '',
      password: '',
      message: ''
    };
    this.menssage = "";
    console.log("Login-form",this.form);
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data,'Singup'),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.menssage = "";
    this.menssage = (typeof error.error.message !== "undefined") ? JSON.stringify( error.error.message ) : '';
    this.menssage += (typeof error.error.error !== "undefined") ? JSON.stringify( error.error.error ) : '';
    if (this.menssage.includes("SQLSTATE")) this.menssage = "Data Base error on backend...";
    if (typeof error.error.message !== "undefined") {
      this.error = error.error.errors;
    }
  }

  handleResponse(data, title) {
    this.Token.handle(data.access_token);
    let _router = this.router;
    this.Auth.changeAuthStatus(true);
    this.Snotify.confirm('Success!', title, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        { text: 'Okay', action: (toast) => {
          _router.navigateByUrl('/profile');
          this.Snotify.remove(toast.id);
        }, bold: true }
      ]
    });
    _router.navigateByUrl('/profile');
  }

  ngOnInit(): void {
  }

}
