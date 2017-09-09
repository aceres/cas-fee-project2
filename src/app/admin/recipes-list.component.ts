// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from '../services/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html'
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  selectedRecipe: Recipe;

  allRecipes: FirebaseListObservable<any[]>;

  // @Input()
  // recipe:  Recipe;

  // @Output()
  // deleteReceiptEvent = new EventEmitter<string>();

  constructor(private router: Router, private recipeService: RecipeService, db: AngularFireDatabase) {
    this.allRecipes = db.list('/recipes');
  }

  getRecipes(): void {
    // this.recipeService.getRecipes().then(recipes => this.allRecipes = recipes);
    this.recipeService.getRecipes().then(recipes => this.allRecipes);
  }

  add(name: string, description: string, portion: string, prepTime: number, level: string, category: string, cuisine: string, step1: string, step2: string, step3: string, quantity: number, unit: string, ingredient: string): void {
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
    this.recipeService.create(name, description, portion, prepTime, level, category, cuisine, step1, step2, step3, quantity, unit, ingredient)
      .then(recipe => {
        // this.recipes.push(recipe);
        // this.selectedRecipe = null;
      });
  }

  // remove() {
  //   this.deleteReceiptEvent.emit(this.recipe.$key)
  // }

  remove(id): void {
    this.recipeService
      .remove(id)
      .then(() => {
        // this.recipes = this.recipes.filter(h => h !== recipe);
        // if (this.selectedRecipe === recipe) { this.selectedRecipe = null; }
      });
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  gotoDetail(recipe): void {
    console.log('Recipe: ', recipe);
    console.log('Recipe Key: ', recipe.$key);
    this.router.navigate(['/admin/recipe-detail', recipe.$key]);
  }
}
