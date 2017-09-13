import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Register } from '../services/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  // Standard Angular CLI
  title = 'What to cook? - Registration';

  // Authentication
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  countries = ['Germany', 'Switzerland', 'Italy', 'France'];

  model = new Register(1, 'André Ceres', this.countries[1], 'Waisenhausstrasse 23');

  submitted = false;

  onSubmit() { this.submitted = true; }

  newRegister() {
    this.model = new Register(2, '', '');
  }
}
