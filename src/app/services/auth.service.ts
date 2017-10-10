import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Success!', response);
        return response;
      })
      .catch(error => {
        console.log('Something went wrong:', error.message);
        return error;
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Nice, it worked!');
        return response;
      })
      .catch(error => {
        console.log('Something went wrong:', error.message);
        return error;
      });
  }

  logout() {
    return this.firebaseAuth
      .auth
      .signOut();
  }
}
