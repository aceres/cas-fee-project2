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

  public portions = [
    { value: '2', display: '2' },
    { value: '4', display: '4' },
    { value: '6', display: '6' },
    { value: '8', display: '8' },
    { value: '10', display: '10' },
    { value: '12', display: '12' }
  ];

  public levels = [
    { value: 'simple', display: 'einfach' },
    { value: 'medium', display: 'mittel' },
    { value: 'difficult', display: 'schwer' },
  ];

  public categories = [
    { value: 'breakfast', display: 'Frühstück' },
    { value: 'starter', display: 'Vorspeise' },
    { value: 'mainCourse', display: 'Hauptgericht' },
    { value: 'snack', display: 'Snack' },
    { value: 'sideDish', display: 'Beilage' },
    { value: 'dessert', display: 'Dessert' }
  ];

  public cuisines = [
    { value: 'indian', display: 'indisch' },
    { value: 'oriental', display: 'orientalisch' },
    { value: 'french', display: 'französisch' },
    { value: 'german', display: 'deutsch' },
    { value: 'asian', display: 'asiatisch' },
    { value: 'italian', display: 'italienisch' },
    { value: 'polish', display: 'polnisch' },
  ];

  add(name: string, description: string, portion: string, prepTime: number, level: string, category: string, cuisine: string, step1: string, step2: string, step3: string): void {
    name = name.trim();
    description = description.trim();
    portion = portion.trim();
    level = level.trim();
    category = category.trim();
    cuisine = cuisine.trim();
    step1 = step1.trim();
    step2 = step2.trim();
    step3 = step3.trim();
    //if (!name && !description) { return; }
    this.recipeService.create(name, description, portion, prepTime, level, category, cuisine, step1, step2, step3)
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
