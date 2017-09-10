import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Recipe } from '../services/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {
  id;
  receipt;
  description;

  constructor(
    private recipeService: RecipeService,
    private af: AngularFireDatabase,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // this.recipe = this.recipeService.getRecipe(this.id);

    this.recipeService.getRecipeDetail(this.id).subscribe(recipe => {
      console.log('!!!!!! recipe: ', recipe);
      this.receipt = recipe.receipt;
      this.description = recipe.description;
    });

  }

  goBack(): void {
    this.location.back();
  }
}
