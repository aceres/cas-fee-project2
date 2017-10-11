import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

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

  currentUser;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    db: AngularFireDatabase) {

    // TODO: Not clean at the moment / Improve it! It is provisional version for now
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('this.currentUser: ', this.currentUser);

      this.allRecipes = db.list('/recipes', {
        query: {
          orderByChild: 'uid',
          equalTo: this.currentUser.uid
        }
      })
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
    // Get the currentUser from the localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('this.currentUser: ', this.currentUser);

    // this.getRecipes(this.currentUser);

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.currentUser.uid = params['uid'];
    })
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  detail(recipe): void {
    this.router.navigate(['/admin/recipe-detail', recipe.$key]);
  }
}
