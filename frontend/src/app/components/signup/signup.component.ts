import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
    phone: null,
    movil: null,
    type: null,
    photo: null,
  };

  public menssage = '';

  public error = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    phone: '',
    movil: '',
    type: '',
    photo: '',
    message:'',
  };

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Snotify: SnotifyService
  ) { }

  onSubmit() {
    this.error = {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      phone: '',
      movil: '',
      type: '',
      photo: '',
      message: '',
    };
    this.menssage = "";
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data,'Singup'),
      error => this.handleError(error)
    );
  }

  handleResponse(data, title) {
    this.Token.handle(data.access_token);
    let _router = this.router;
    this.Snotify.confirm('Success!', title, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Okay', action: (toast) => {
            _router.navigateByUrl('/profile');
            this.Snotify.remove(toast.id);
          }, bold: true
        }
      ]
    });
    _router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.menssage = "";
    this.menssage = (typeof error.error.message !== "undefined") ? error.error.message : '';
    if (typeof error.error.message !== "undefined") {
      this.error = error.error.errors;
    }
  }

  ngOnInit(): void {
  }

}
