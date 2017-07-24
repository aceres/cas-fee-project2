import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html'
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  selectedRecipe: Recipe;

  constructor(
    private router: Router,
    private recipeService: RecipeService) { }

  getRecipes(): void {
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes);
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  gotoDetail(): void {
    this.router.navigate(['/recipe-detail', this.selectedRecipe.id]);
  }
}
