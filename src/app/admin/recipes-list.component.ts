import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from '../services/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.less']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  allRecipes: FirebaseListObservable<any[]>;

  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;
  public numPages:number = 0;

  // Alert
  public alerts: any = [];

  public searchTerm;

  constructor(private router: Router, private recipeService: RecipeService, db: AngularFireDatabase) {
    this.allRecipes = db.list('/recipes');
  }

  getRecipes(): void {
    // this.recipeService.getRecipes().then(recipes => this.allRecipes = recipes);
    this.recipeService.getRecipes().then(recipes => this.allRecipes);
  }

  remove(id): void {
    this.recipeService
      .remove(id)
      .then(() => {
        // this.recipes = this.recipes.filter(h => h !== recipe);
        // if (this.selectedRecipe === recipe) { this.selectedRecipe = null; }

        this.alerts.push({
          type: 'success',
          msg: `Rezept wurde erfolgreich entfernt! (Geändert am: ${(new Date()).toLocaleTimeString()})`,
          timeout: 5000
        });
      });
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  detail(recipe): void {
    this.router.navigate(['/admin/recipe-detail', recipe.$key]);
  }
}
