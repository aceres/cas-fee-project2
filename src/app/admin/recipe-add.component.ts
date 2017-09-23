import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { listCategories } from '../global/list.categories';
import { listPortions } from '../global/list.portions';
import { listLevels } from '../global/list.levels';
import { listCuisines } from '../global/list.cuisines';
import { listUnits } from '../global/list.units';

import { Recipe } from '../services/recipe';
import { RecipeService } from '../services/recipe.service';

class Step {
  constructor(
    public stepDescription: string,
    public photo: string
  ) { }
}

class Ingredient {
  constructor(
    public quantity: number,
    public unit: string,
    public ingredient: string
  ) { }
}

@Component({
  selector: 'app-recipes-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.less']
})
export class RecipeAddComponent implements OnInit {
  recipes: Recipe[];
  listCategories = listCategories;
  listPortions = listPortions;
  listLevels = listLevels;
  listCuisines = listCuisines;
  listUnits = listUnits;
  steps = [];
  ingredients = [];

  // Initialize: For the validation
  // TODO: This doesn't work for now
  ingredient = { recipeQuantity: '', recipeIngredient: '' };
  step = { description: '', photo: '' };

  constructor(
    private router: Router,
    private recipeService: RecipeService) { }

  add(name: string,
      description: string,
      portion: string,
      prepTime: number,
      level: string,
      category: string,
      cuisine: string,
      steps: any[],
      quantity: number,
      unit: string,
      ingredients: any[]): void {
            name = name.trim();
            description = description.trim();
            portion = portion.trim();
            prepTime = prepTime;
            level = level.trim();
            category = category.trim();
            cuisine = cuisine.trim();
            steps = this.steps;
            quantity = quantity;
            unit = unit;
            ingredients = this.ingredients;

            this.recipeService.create(name, description, portion, prepTime, level, category, cuisine, steps, quantity, unit, ingredients)
            .then(recipe => {
              // this.recipes.push(recipe);
              // this.selectedRecipe = null;
      });
  }

  addStep(stepDescription: string, photo: string) {
    if (stepDescription) {
      this.steps.push(new Step(stepDescription, photo));
    }
  }

  removeStep(index) {
    this.steps.splice(index, 1);
  }

  addIngredient(quantity: number, unit: string, ingredient: string) {
    this.ingredients.push(new Ingredient(quantity, unit, ingredient));
  }

  removeIngredient(index) {
    this.ingredients.splice(index, 1);
  }

  ngOnInit(): void { }
}
