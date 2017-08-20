import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Standard Angular CLI
  title = 'What to cook?';

  items: FirebaseListObservable<any[]>;

  constructor(private recipeService: RecipeService, db: AngularFireDatabase) {
    this.items = db.list('/items');
  }

  // Search recipe
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .then(recipes => this.recipes = recipes.slice(1, 5));
  }
}
