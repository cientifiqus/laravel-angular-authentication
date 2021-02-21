import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/Services/jarwis.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.sass']
})
export class RequestResetComponent implements OnInit {

  public menssage = '';

  public form = {
    email: null
  };

  public error = {
    email: '',
    message: ''
  };

  constructor(
    private Jarwis: JarwisService,
    private snotifyService: SnotifyService,
    private router: Router,
    private Snotify: SnotifyService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.error = {
      email: '',
      message: ''
    };
    this.menssage = '';
    this.Jarwis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.snotifyService.error(error.error.error)
    );
  }

  handleResponse(response) {
    let _router = this.router;
    this.Snotify.info('Wait...', { timeout: 5000, showProgressBar: true});
    this.Snotify.confirm('Emails sent!', 'Reset password', {
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        { text: 'Okay', action: (toast) => { _router.navigateByUrl('/profile'); this.Snotify.remove(toast.id); }, bold: true }
      ]
    });
  }

}
