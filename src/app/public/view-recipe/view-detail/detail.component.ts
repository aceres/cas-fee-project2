import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AlertComponent } from '../../../directives/alert/alert.component';

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
  recipeId;
  showAddFavorite;

  recipeName;

  // Alert
  @ViewChild('childAlert') public childAlert: AlertComponent;

  constructor(
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    public db: AngularFireDatabase
  ) {
    this.key = this.route.snapshot.params['id'];
  }

  ngOnInit() {

    this.getRecipe();

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

  getRecipe() {
    this.recipeService.getRecipe(this.key).then(data => {
      console.log('data: ', data);
      this.recipe = data;
    });
  }

  addRecipeToFavorites(recipeKey, recipeName) {
    event.preventDefault();

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.currentUser !== null) {

      this.favoriteService.addRecipeToFavorites(this.currentUser.uid, recipeKey, recipeName);
      this.childAlert.showAlert('success', `Super! Ihr Lieblingsrezept wurde in Ihrem Favoriten hinzugefügt! (Hinzugefügt am: ${(new Date()).toLocaleTimeString()})`);
    }
  }

  rateRecipe() {
    const databaseRef = this.db.database.ref('recipes').child(this.key).child('rating');

    console.log('databaseRef: ', databaseRef);

    databaseRef.transaction(function(rating) {

      if (rating || (rating === 0)) {
        rating++;
      }
      return rating;
    });
    this.getRecipe();
  }

  goBack(): void {
    this.location.back();
  }
}
