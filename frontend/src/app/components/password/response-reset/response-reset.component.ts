import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { Router } from '@angular/router';
import { Snotify, SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.sass']
})
export class ResponseResetComponent implements OnInit {

  public menssage = '';

  public form = {
    email: null,
    password: null,
    password_confirmation:null,
    resetToken: null
  };

  public error = {
    email: '',
    password: null,
    password_confirmation: null,
    resetToken: null,
    message: ''
  };

  constructor(
    private Jarwis: JarwisService,
    private route:ActivatedRoute,
    private router: Router,
    private Snotify:SnotifyService
  ) {
    route.queryParams.subscribe(
      params => this.form.resetToken = params['token']
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.error = {
      email: '',
      password: null,
      password_confirmation: null,
      resetToken: null,
      message: ''
    };
    this.menssage = "";
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(response) {
    let _router = this.router;
    this.Snotify.info('Wait...', { timeout: 5000, showProgressBar: true });
    this.Snotify.confirm('Success!', 'Reset Password', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        { text: 'Okay', action: (toast) => { _router.navigateByUrl('/profile'); this.Snotify.remove(toast.id); }, bold: true }
      ]
    });
  }


  handleError(error) {
    this.menssage = "";
    this.menssage = (typeof error.error.message !== "undefined") ? JSON.stringify(error.error.message) : '';
    this.menssage += (typeof error.error.error !== "undefined") ? JSON.stringify(error.error.error) : '';
    if (typeof error.error.message !== "undefined") {
      this.error = error.error.errors;
    }
  }

}
