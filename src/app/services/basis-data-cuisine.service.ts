import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Cuisine } from './basis-data-cuisine';

@Injectable()
export class BasisDataCuisineService {

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  private cuisinesUrl = environment.apiUrl + 'cuisines';

  constructor(
    private http: Http
  ) { }

  getCuisines(): Promise<Cuisine[]> {
    const url = `${this.cuisinesUrl}.json`;
    return this.http.get(`${this.cuisinesUrl}.json`)
      .toPromise()
      .then(response => response.json() as Cuisine[])
      .catch(this.handleError);
  }

  // TODO: See the "Take it slow" appendix
  getCuisinesSlowly(): Promise<Cuisine[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCuisines()), 2000);
    });
  }

  getCuisine(id: number): Promise<Cuisine> {
    const url = `${this.cuisinesUrl}?id=${id}.json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Cuisine)
      .catch(this.handleError);
  }

  remove(Cuisine): Promise<void> {
    console.log('Remove' , Cuisine.$key);
    const url = `${this.cuisinesUrl}/${Cuisine.$key}.json`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Cuisine> {
    const url = `${this.cuisinesUrl}.json`;
    return this.http
      .post(url, JSON.stringify({cuisine: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Cuisine)
      .catch(this.handleError);
  }

  update(Cuisine: Cuisine): Promise<Cuisine> {
    const url = `${this.cuisinesUrl}/${Cuisine.key}.json`;
    return this.http
      .put(url, JSON.stringify(Cuisine), {headers: this.headers})
      .toPromise()
      .then(() => Cuisine)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
