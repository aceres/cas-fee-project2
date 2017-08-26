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
      .get(`api/recipes/?name=${term}`)
      .map(response => response.json().data as Recipe[]);
  }
}
