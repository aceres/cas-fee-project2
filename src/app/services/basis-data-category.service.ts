import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Category } from './basis-data-category';

@Injectable()
export class BasisDataCategoryService {

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  private categoriesUrl = environment.apiUrl + 'categories';

    constructor(
    private http: Http
  ) { }

  getCategories(): Promise<Category[]> {
    const url = `${this.categoriesUrl}.json`;
    return this.http.get(`${this.categoriesUrl}.json`)
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this.handleError);
  }

  // TODO: See the "Take it slow" appendix
  getCategoriesSlowly(): Promise<Category[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCategories()), 2000);
    });
  }

  getCategory(id: number): Promise<Category> {
    const url = `${this.categoriesUrl}?id=${id}.json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Category)
      .catch(this.handleError);
  }

  remove(category): Promise<void> {
    console.log('Remove' , category.$key);
    const url = `${this.categoriesUrl}/${category.$key}.json`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Category> {
    const url = `${this.categoriesUrl}.json`;
    return this.http
      .post(url, JSON.stringify({category: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Category)
      .catch(this.handleError);
  }

  update(category: Category): Promise<Category> {
    const url = `${this.categoriesUrl}/${category.key}.json`;
    return this.http
      .put(url, JSON.stringify(category), {headers: this.headers})
      .toPromise()
      .then(() => category)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
