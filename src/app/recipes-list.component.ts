import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes-list',
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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.recipeService.create(name)
      .then(recipe => {
        this.recipes.push(recipe);
        this.selectedRecipe = null;
      });
  }

  delete(recipe: Recipe): void {
    this.recipeService
      .delete(recipe.id)
      .then(() => {
        this.recipes = this.recipes.filter(h => h !== recipe);
        if (this.selectedRecipe === recipe) { this.selectedRecipe = null; }
      });
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
