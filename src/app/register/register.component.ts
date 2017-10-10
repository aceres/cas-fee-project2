import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  title = 'What to cook?';

  // Authentication / Role definition
  model: any = {};
  role = 'normal';

  // Notification
  public alerts: any = [];

  constructor(
    public authService: AuthService,
    public registerService: RegisterService
  ) {}

  register() {
    this.authService.signup(this.model.email, this.model.password).then(
      response => {
        if (response.uid !== '') {
          this.registerService.add(response.uid, this.model.firstName, this.model.lastName, this.model.email, this.role,
          this.model.street, this.model.houseNumber, this.model.zip, this.model.city, this.model.country)
            .subscribe(response => {

              // Show notification
              this.alerts.push({
                type: 'success',
                msg: `Sie wurden erfolgreich registriert! (Erstellt am: ${(new Date()).toLocaleTimeString()})`,
                timeout: 5000
              });

            });
          this.authService.logout();
        }
      }
    );

    // this.model.firstName = this.model.lastName = this.model.email = this.model.password = '';
  }
}
