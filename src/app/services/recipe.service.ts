import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

  private recipesUrl = 'https://project2-60db1.firebaseio.com/recipes';

  constructor(private http: Http, private db: AngularFireDatabase) { }

  getRecipes(): Promise<Recipe[]> {
    const url = `${this.recipesUrl}.json`;
    return this.http.get(`${this.recipesUrl}.json`)
      .toPromise()
      // TODO: Is this different?
      // .then(response => response.json().data as Recipe[])
      .then(response => response.json() as Recipe[])
      .catch(this.handleError);
  }

  searchRecipes(start, end): FirebaseListObservable<any> {
    return this.db.list('recipes', {
      query: {
        orderByChild: 'receipt',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }

  // TODO: See the "Take it slow" appendix
  getRecipesSlowly(): Promise<Recipe[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getRecipes()), 2000);
    });
  }

  getRecipe(id: number): Promise<Recipe> {
    const url = `${this.recipesUrl}?id=${id}.json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Recipe)
      .catch(this.handleError);
  }

  remove(recipe): Promise<void> {
    console.log('Remove' , recipe.$key);
    const url = `${this.recipesUrl}/${recipe.$key}.json`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string, description: string): Promise<Recipe> {
    const url = `${this.recipesUrl}.json`;
    return this.http
      .post(url, JSON.stringify({receipt: name, description: description}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Recipe)
      .catch(this.handleError);
  }

  update(recipe: Recipe): Promise<Recipe> {
    const url = `${this.recipesUrl}/${recipe.id}.json`;
    return this.http
      .put(url, JSON.stringify(recipe), {headers: this.headers})
      .toPromise()
      .then(() => recipe)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
