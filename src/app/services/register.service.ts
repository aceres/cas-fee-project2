import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Register } from './models/register';

@Injectable()
export class RegisterService {
  user: FirebaseObjectObservable<any>;

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  private usersUrl = environment.apiUrl + 'users';

  constructor(
    private http: Http,
    private db: AngularFireDatabase
  ) { }

  add(
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    street: string,
    houseNumber: string,
    zip: number,
    city: string,
    country: string) {

      const url = `${this.usersUrl}.json`;
      return this.http
        .post(url, JSON.stringify({
          uid: uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
          street: street,
          houseNumber: houseNumber,
          zip: zip,
          city: city,
          country: country,
          createdAt: new Date()}), {headers: this.headers})
        .map(res => res.json())
        .catch(this.handleError);
  }

  getUsers(): Promise<Register[]> {
    const url = `${this.usersUrl}.json`;
    return this.http.get(`${this.usersUrl}.json`)
      .toPromise()
      .then(response => response.json() as Register[])
      .catch(this.handleError);
  }

  getUser(currentUser): Promise<Register[]> {
    console.log('register service uid: ', currentUser.uid);
    const url = `${this.usersUrl}.json`;
    return this.http.get(`${this.usersUrl}.json?orderBy=$key&uid=${currentUser.uid}`)
      .toPromise()
      .then(response => response.json() as Register[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
