import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';

@Injectable()
export class RecipeService {
  getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(RECIPES);
  }

  // See the "Take it slow" appendix
  getRecipesSlowly(): Promise<Recipe[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getRecipes()), 2000);
    });
  }

  getRecipe(id: number): Promise<Recipe> {
    return this.getRecipes()
      .then(recipes => recipes.find(recipe => recipe.id === id));
  }
}
