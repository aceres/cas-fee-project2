import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent {
  title = 'What to cook?';

  // Authentication
  uid: string;
  email: string;
  password: string;

  // Notification
  public alerts: any = [];

  constructor(public authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).then(
      response => {

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

          // Save the logged in user in the storage
          const currentUser = {
            'uid': '',
            'email': ''
          };

          currentUser.uid = response.uid;
          currentUser.email = response.email;

          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      }
    );
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();

    this.alerts.push({
      type: 'success',
      msg: `Sie wurden erfolgreich abgemeldet! (Abgemeldet am: ${(new Date()).toLocaleTimeString()})`,
      timeout: 5000
    });

    localStorage.removeItem('currentUser');
  }
}
