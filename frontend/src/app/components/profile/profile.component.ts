import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  public error = {
    email: null,
    name: null,
    phone: null,
    movil: null,
    type: null,
    photo: null,
    message: null,
  };

  public menssage = null;

  reader = new FileReader();

  file: File;
  file_content: any;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Snotify: SnotifyService,
    public _DomSanitizer: DomSanitizer
  ) {
    this.Jarwis.retrieveUser(this.form).subscribe(
      data => this.handleRetrieveResponse(data),
      error => this.handleError(error)
    );
  }

  onSubmit() {
    this.error = {
      email: null,
      name: null,
      phone: null,
      movil: null,
      type: null,
      photo: null,
      message: null,
    };
    this.menssage = "";
    this.Jarwis.updateUser(this.form).subscribe(
      data => this.handleResponse(data, 'Update'),
      error => this.handleError(error)
    );
  }

  handleResponse(data,title) {
    this.Snotify.info('Wait...', { timeout: 5000, showProgressBar: true });
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
    this.file_content = this.form.photo;
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

  fileChange(file) {
    this.file = file.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.form.photo = this.file_content = fileReader.result;
    }
    fileReader.readAsDataURL(this.file);

  }
}
