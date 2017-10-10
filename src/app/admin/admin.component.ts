import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent {
  // Standard Angular CLI
  title = 'What to cook?';

  // Authentication
  email: string;
  password: string;

  // Notification
  public alerts: any = [];

  constructor(public authService: AuthService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password).then(
      response => {

        console.log('login response: ', response);

        if (response.code === 'auth/invalid-email') {

          this.alerts.push({
            type: 'danger',
            msg: `${ response.message }`,
            timeout: 5000
          });
        } else if (response.code === 'auth/user-not-found') {

          this.alerts.push({
            type: 'info',
            msg: `${ response.message }`,
            timeout: 5000
          });
        } else if (response.code === 'auth/wrong-password') {

          this.alerts.push({
            type: 'info',
            msg: `${ response.message }`,
            timeout: 5000
          });
        } else {

          this.alerts.push({
            type: 'success',
            msg: `Sie sind erfolgreich angemeldet ${ response.email }! (Angemeldet am: ${(new Date()).toLocaleTimeString()})`,
            timeout: 5000
          });
        }
      }
    );
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout()

    this.alerts.push({
      type: 'success',
      msg: `Sie wurden erfolgreich abgemeldet! (Abgemeldet am: ${(new Date()).toLocaleTimeString()})`,
      timeout: 5000
    });
  }
}
