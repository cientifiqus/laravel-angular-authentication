import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.sass']
})
export class CategoryCreateComponent implements OnInit {

  public form = {
    name: null,
    description: null
  };

  public menssage = '';

  public error = {
    name: null,
    description: null,
    message: ''
  };

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private Snotify: SnotifyService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.error = {
      name: null,
      description: null,
      message: ''
    };
    this.menssage = "";
    console.log("Login-form", this.form);
    this.Jarwis.CategoryCreate(this.form).subscribe(
      data => this.handleResponse(data, 'Singup'),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.menssage = "";
    this.menssage = (typeof error.error.message !== "undefined") ? JSON.stringify(error.error.message) : '';
    this.menssage += (typeof error.error.error !== "undefined") ? JSON.stringify(error.error.error) : '';
    if (this.menssage.includes("SQLSTATE")) this.menssage = "Data Base error on backend...";
    if (typeof error.error.message !== "undefined") {
      this.error = error.error.errors;
    }
  }

  handleResponse(data, title) {
    let _router = this.router;
    this.Auth.changeAuthStatus(true);
    this.Snotify.confirm('Success!', title, {
      timeout: 5000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Okay', action: (toast) => {
            _router.navigateByUrl('/CategoryList');
            this.Snotify.remove(toast.id);
          }, bold: true
        }
      ]
    });
    _router.navigateByUrl('/CategoryList');
  }

}
