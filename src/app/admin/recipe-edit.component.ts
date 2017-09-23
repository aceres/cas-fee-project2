import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { listCategories } from '../global/list.categories';
import { listPortions } from '../global/list.portions';
import { listLevels } from '../global/list.levels';
import { listCuisines } from '../global/list.cuisines';
import { listUnits } from '../global/list.units';

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
  portion;
  prepTime;
  level;
  category;
  cuisine;

  steps;
  ingredients;

  listCategories = listCategories;
  listPortions = listPortions;
  listLevels = listLevels;
  listCuisines = listCuisines;
  listUnits = listUnits;

  // Initialize: For the validation
  // TODO: This doesn't work for now
  ingredient = { recipeQuantity: '', recipeIngredient: '' };
  step = { description: '', photo: '' };

  constructor(
    private recipeService: RecipeService,
    private af: AngularFireDatabase,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.recipeService.getRecipeDetail(this.id).subscribe(recipe => {
      console.log('Edit recipe: ', recipe);
      this.receipt = recipe.receipt;
      this.description = recipe.description;
      this.portion = recipe.portion;
      this.prepTime = recipe.prepTime;
      this.level = recipe.level;
      this.category = recipe.category;
      this.cuisine = recipe.cuisine;
      this.steps = recipe.steps;
      this.ingredients = recipe.ingredients;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
