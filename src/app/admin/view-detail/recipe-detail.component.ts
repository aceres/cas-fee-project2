import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Recipe } from '../../services/models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.recipeService.getRecipe(params.get('id')))
      .subscribe(recipe => this.recipe = recipe);
  }

  goBack(): void {
    this.location.back();
  }
}
