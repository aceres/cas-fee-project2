import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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
  itemsReturned;
  public currentTotal: number;

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
      this.image = this.recipeService.getImage(id);
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
    // console.log('this.key: ', this.key);
    // const obs = this.db.object('/recipes/' + this.key);
    // obs.$ref.transaction(function(userObject){
    //   console.log('currentCount is: ', userObject);
    //   const newRating = {
    //     rating: count + 1
    //   };
    //   obs.update(newRating);
    // });
    console.log('this.key: ', this.key);


    const databaseRef = this.db.database.ref('recipes').child(this.key).child('rating');

    console.log('databaseRef: ', databaseRef);

    databaseRef.transaction(function(rating) {

      if (rating || (rating === 0)) {
        rating++;
      }
      return rating;

      // if (rating) {
      //   rating = (rating || 0) + 1;
      // }
      // return rating;
    });

    this.recipe = this.recipeService.getRecipe(this.key);

    // this.recipe = this.recipeService.getRecipe(this.key);
    // this.rating = this.db.list('/recipes', {
    //   query: {
    //     orderByKey: this.key,
    //     equalTo: this.key
    //   }
    // });
    // this.rating = this.db.list(`/recipes/${this.key}`);
    // this.rating.subscribe((res) => {
    //   this.itemsReturned = res;
    //
    //   console.log('this.itemsReturned: ', this.itemsReturned[0]);
    //
    //   this.currentTotal = this.itemsReturned[0].rating;
    //   this.currentTotal = this.currentTotal + 1;
    //   console.log('this.currentTotal', this.currentTotal);
    //
    // });

    // TODO: Update
    // const newCount = this.currentTotal;
    // console.log('newCount: ', newCount);
    // this.db.object('/recipes/' + this.key)
    //   .update({ rating: newCount });

    // const tagObs = this.db.object(`/recipes/${this.key}`);
    // tagObs.$ref.transaction(function(object) {
    //
    //   const newRating = {
    //     rating: currentTotal++
    //   };
    //   tagObs.update(newRating);
    // });



    // this.key = this.route.snapshot.params['id'];
    // console.log('count: ', count);
    // this.db.object('/recipes/' + this.key)
    //   .update({ rating: count });
  }

  goBack(): void {
    this.location.back();
  }
}
