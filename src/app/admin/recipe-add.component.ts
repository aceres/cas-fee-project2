import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../services/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes-add',
  templateUrl: './recipe-add.component.html'
})
export class RecipeAddComponent implements OnInit {
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

  ngOnInit(): void {
    this.getRecipes();
  }
}
