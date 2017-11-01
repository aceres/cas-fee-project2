import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from '../../services/models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  title = 'Manducare';

  startAt = new Subject();
  endAt = new Subject();
  recipes: any[];

  lastKeypress: number = 0;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {

    this.recipeService.searchRecipes(this.startAt, this.endAt)
      .subscribe(recipes => this.recipes = recipes)
  }

  searchRecipe($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      const q = $event.target.value.charAt(0).toUpperCase();
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timeStamp
  }

  detail(recipe): void {
    this.router.navigate(['/recipe-detail', recipe.$key]);
  }
}
