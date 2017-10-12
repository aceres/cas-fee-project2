import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent {
  title = 'What to cook?';

  // Authentication
  email: string;
  password: string;

  // Notification
  public alerts: any = [];

  // Role
  public role: string;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase,
    private router: Router
  ) {}

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

          // Prepare for the localStorage
          const currentUser = {};

          currentUser['uid'] = response.uid;
          currentUser['email'] = response.email;

          // Get the role of user
          // TODO - instead this -> this.db.object
          this.db.list('/users', {
            query: {
              orderByChild: 'uid',
              equalTo: response.uid,
              limitToFirst: 1
            }
          })
          .subscribe(user => {

            // TODO: Clean up / Somehow dirty
            this.role = user[0].role;
            currentUser['role'] = this.role;
            console.log('inside this.role: ', this.role);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.router.navigate(['/admin/recipes']);
          });
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
    this.router.navigateByUrl('/admin');
  }
}
