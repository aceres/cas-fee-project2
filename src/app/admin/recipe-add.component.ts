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

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name && !description) { return; }
    this.recipeService.create(name, description)
      .then(recipe => {
        // TODO: Have a look with the tutor
        // this.recipes.push(recipe);
        // this.selectedRecipe = null;
      });
  }

  ngOnInit(): void {
    this.getRecipes();
  }
}
