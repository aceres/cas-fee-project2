import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  title = 'What to cook?';

  // Authentication
  model: any = {};
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  register() {
    this.authService.signup(this.email, this.password);


    this.email = this.password = '';
  }
}
