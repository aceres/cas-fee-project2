import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { RecipeService } from '../../../services/recipe.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-public-recipe-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class PublicReceiptDetailComponent implements OnInit {
  title = 'What to cook?';
  recipe;
  image;
  key;
  rating: FirebaseListObservable<any[]>;

  // sessionStorage
  currentUser;
  userId;
  recipeId;
  showAddFavorite;

  recipeName;
  imageUrl;

  constructor(
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    public db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      const id = urlParameters['id'];
      this.recipe = this.recipeService.getRecipe(id);
    });
    this.key = this.route.snapshot.params['id'];

    // Save Favorite Recipe allowed or not
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser !== null) {

      this.db.list('favorites', {
        query: {
          orderByChild: 'uid',
          equalTo: this.currentUser.uid
        }
      }).subscribe(items => {
        console.log('items:', items);
        const filtered = items.filter(item => item.recipeId === this.key);
        if (filtered.length !== 0) {
          if (filtered[0].recipeId === this.key && filtered[0].uid === this.currentUser.uid) {
            this.showAddFavorite = false;
          } else {
            this.showAddFavorite = true;
          }
        } else {
          this.showAddFavorite = true;
        }
      });

    }
  }

  favoriteRecipe(recipeKey) {
    event.preventDefault();

    console.log('recipeKey: ', recipeKey);

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser !== null) {

      console.log('currentUser: ', this.currentUser.uid);

      const key = this.key;
      // let recipeName;
      // let imageUrl;
      this.db
        .object(`recipes/${key}`)
        .subscribe((result) => {

          console.log('result: ', result);
          // this.recipeName = result.receipt;
          // this.imageUrl = result.image.url;

        });
      this.favoriteService.addFavoriteRecipe(this.currentUser.uid, recipeKey);
    }
  }

  rateRecipe() {
    this.key = this.route.snapshot.params['id'];
    const databaseRef = this.db.database.ref('recipes').child(this.key).child('rating');

    console.log('databaseRef: ', databaseRef);

    databaseRef.transaction(function(rating) {

      if (rating || (rating === 0)) {
        rating++;
      }
      return rating;
    });

    this.recipe = this.recipeService.getRecipe(this.key);
  }

  goBack(): void {
    this.location.back();
  }
}
