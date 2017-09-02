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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.recipeService.create(name)
      .then(recipe => {
        this.recipes.push(recipe);
        this.selectedRecipe = null;
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

  gotoDetail(): void {
    this.router.navigate(['/admin/recipe-detail', this.selectedRecipe.id]);
  }
}
