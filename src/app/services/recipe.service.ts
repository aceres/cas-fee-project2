import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';
import { Upload } from './upload';

@Injectable()
export class RecipeService {
  recipe: FirebaseObjectObservable<any>;
  image: FirebaseObjectObservable<any>;

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  private recipesUrl = environment.apiUrl + 'recipes';
  private imagesUrl = environment.apiUrl + 'uploads';

  constructor(
    private http: Http,
    private db: AngularFireDatabase
  ) { }

  // getRecipesAdmin(currentUser): Promise<Recipe[]> {
  //   console.log('service recipe current user: ', currentUser);
  //   const url = `${this.recipesUrl}.json`;
  //   return this.http.get(`${this.recipesUrl}.json?orderBy=$key&uid=${currentUser.uid}`)
  //     .toPromise()
  //     .then(response => response.json() as Recipe[])
  //     .catch(this.handleError);
  // }

  getRecipes(): Promise<Recipe[]> {
    const url = `${this.recipesUrl}.json`;
    return this.http.get(`${this.recipesUrl}.json`)
      .toPromise()
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

  getRecipe(id: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}.json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.handleError);
  }

  // TODO: Refactoring
  getImage(id: string): Promise<Upload> {
    const url = `${this.imagesUrl}/${id}.json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Upload)
      .catch(this.handleError);
  }

  getRecipeDetail(id: string) {
    this.recipe = this.db.object(`${this.recipesUrl}/${id}`);
    return this.recipe;
  }

  create(name: string, description: string, portion: string, prepTime: number, level: string, category: string, cuisine: string, steps: any[], ingredients: any[], image: any[], uid: string, user: string) {
    const url = `${this.recipesUrl}.json`;
    return this.http
      .post(url, JSON.stringify({receipt: name, description: description, portion: portion, prepTime: prepTime, level: level, category: category, cuisine: cuisine, steps: steps, ingredients: ingredients, image: image, uid: uid, user: user, createdAt: new Date()}), {headers: this.headers})
      // .toPromise()
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id: string, name: string, description: string, portion: string, prepTime: number, level: string, category: string, cuisine: string, steps: any[], ingredients: any[], uid: string, user: string): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}.json`;
    return this.http
      .put(url, JSON.stringify({receipt: name, description: description, portion: portion, prepTime: prepTime, level: level, category: category, cuisine: cuisine, steps: steps, ingredients: ingredients, uid: uid, user: user}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Recipe)
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
