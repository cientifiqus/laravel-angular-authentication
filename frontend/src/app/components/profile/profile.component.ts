import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

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
    phone: null,
    movil: null,
    type: null,
    photo: null,
    message: '',
  };

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Snotify: SnotifyService
  ) {
    this.Jarwis.retrieveUser(this.form).subscribe(
      data => this.handleRetrieveResponse(data),
      error => this.handleError(error)
    );
    this.form.name = "456";
    this.form.email = "456@af.ff";
  }

  onSubmit() {
    this.error = {
      email: '',
      name: '',
      phone: null,
      movil: null,
      type: null,
      photo: null,
      message: '',
    };
    this.menssage = "";
    this.Jarwis.updateUser(this.form).subscribe(
      data => this.handleResponse(data, 'Update'),
      error => this.handleError(error)
    );
  }

  handleResponse(data,title) {
    this.Snotify.confirm('Success!', title, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Okay', action: (toast) => {
            this.Snotify.remove(toast.id);
          }, bold: true
        }
      ]
    });
  }

  handleRetrieveResponse(data) {
    this.form = data;
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

  deleteUser(Event: MouseEvent) {
    this.Jarwis.deleteUser(this.form).subscribe(
      data => this.handleResponse(data, 'Delete'),
      error => this.handleError(error)
    );
  }

}
