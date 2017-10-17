import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Recipe } from '../../services/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe;
  key;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      const id = urlParameters['id'];
      this.recipe = this.recipeService.getRecipe(id);
    });
    this.key = this.route.snapshot.params['id'];
  }

  goBack(): void {
    this.location.back();
  }
}