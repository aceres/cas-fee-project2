import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recipe } from './recipe';

@Injectable()
export class RecipeSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Recipe[]> {
    return this.http
      // .get(`api/recipes/?name=${term}`)
      // TODO: Why does it not work?
      .get(`https://project2-60db1.firebaseio.com/recipes.json?receipt=${term}`)
      //.map(response => Array.of(response.json()) as Recipe[]);
      .map(response => response.json() as Recipe[]);
  }
}
