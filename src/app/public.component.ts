import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Recipe } from './services/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.less']
})
export class PublicComponent {
  // Standard Angular CLI
  title = 'What to cook?';

  allRecipes: FirebaseListObservable<any[]>;

  constructor(private recipeService: RecipeService, db: AngularFireDatabase) {
    this.allRecipes = db.list('/recipes');
  }

  // Search recipe
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .then(recipes => this.recipes);
      // TODO: Why was this not working
      // .then(recipes => this.recipes = recipes.slice(1, 5));
  }
}
