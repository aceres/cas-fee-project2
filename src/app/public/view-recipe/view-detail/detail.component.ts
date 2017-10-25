import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { RecipeService } from '../../../services/recipe.service';

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

  constructor(
    private recipeService: RecipeService,
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
  }

  favoriteRecipe(recipeKey) {
    console.log('recipeKey: ', recipeKey);
    event.preventDefault();

    // TODO: How to save recipe key with the user information
  }

  rateRecipe(): void {

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
