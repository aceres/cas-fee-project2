import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import { Recipe } from './models/recipe';
import { Upload } from './models/upload';

@Injectable()
export class RecipeService {
  recipe: FirebaseObjectObservable<any>;
  image: FirebaseObjectObservable<any>;

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  private recipesUrl = environment.apiUrl + 'recipes';

  constructor(
    private http: Http,
    private db: AngularFireDatabase
  ) {}

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

  getRecipeDetail(id: string) {
    this.recipe = this.db.object(`${this.recipesUrl}/${id}`);
    return this.recipe;
  }

  create(
    name: string,
    description: string,
    portion: string,
    prepTime: number,
    level: string,
    category: string,
    cuisine: string,
    steps: any[],
    ingredients: any[],
    image: any[],
    uid: string,
    user: string
  ) {
    const url = `${this.recipesUrl}.json`;
    return this.http
      .post(url, JSON.stringify({
        receipt: name,
        description: description,
        portion: portion,
        prepTime: prepTime,
        rating: 0,
        level: level,
        category: category,
        cuisine: cuisine,
        steps: steps,
        ingredients: ingredients,
        image: image,
        uid: uid,
        user: user,
        createdAt: new Date()}), {headers: this.headers})
      // .toPromise()
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(
    id: string,
    name: string,
    description: string,
    portion: string,
    prepTime: number,
    rating: number,
    level: string,
    category: string,
    cuisine: string,
    steps: any[],
    ingredients: any[],
    image: any[],
    uid: string,
    user: string
  ): Promise<Recipe> {
    const url = `${this.recipesUrl}/${id}.json`;
    return this.http
      .put(url, JSON.stringify({
        receipt: name,
        description: description,
        portion: portion,
        prepTime: prepTime,
        rating: rating,
        level: level,
        category: category,
        cuisine: cuisine,
        steps: steps,
        ingredients: ingredients,
        image: image,
        uid: uid,
        user: user
      }), {headers: this.headers})
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
