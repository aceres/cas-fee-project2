import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Favorite } from './models/favorite';

@Injectable()
export class FavoriteService {
  recipe: FirebaseObjectObservable<any>;
  image: FirebaseObjectObservable<any>;

  private headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  private favoritesUrl = environment.apiUrl + 'favorites';

  constructor(
    private http: Http,
    private db: AngularFireDatabase
  ) {}

  addRecipeToFavorites(
    uid: string,
    recipeId: string,
    recipeName: string
  ) {
    const itemRef = this.db.list('favorites');
    itemRef.push({
      uid: uid,
      recipeId: recipeId,
      recipeName: recipeName
    }).then(resolve => {
      console.log('Resolve:', resolve);
    })
    .catch(error => {
      console.log('Error: ', error);
    });
  }

  remove(favorite): Promise<void> {

    const url = `${this.favoritesUrl}/${favorite.$key}.json`;
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
