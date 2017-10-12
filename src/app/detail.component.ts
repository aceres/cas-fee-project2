import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-public-recipe-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class PublicReceiptDetailComponent implements OnInit {
  title = 'What to cook?';
  recipe;
  image;
  key;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location)
  {}

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      const id = urlParameters['id'];
      this.recipe = this.recipeService.getRecipe(id);
      this.image = this.recipeService.getImage(id);
    });
    this.key = this.route.snapshot.params['id'];
  }

  goBack(): void {
    this.location.back();
  }
}
