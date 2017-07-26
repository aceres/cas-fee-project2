import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Standard Angular CLI
  title = 'What to cook?';

  constructor(private recipeService: RecipeService) {}

  // Search recipe
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .then(recipes => this.recipes = recipes.slice(1, 5));
  }
}
