import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from './services/recipe';
import { RecipeService } from './services/recipe.service';
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  // Standard Angular CLI
  title = 'What to cook?';

  recipes;

  startAt = new Subject()
  endAt = new Subject()

  lastKeypress: number = 0;

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.searchRecipes(this.startAt, this.endAt)
      .subscribe(recipes => this.recipes = recipes)
  }

  searchRecipe($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      let q = $event.target.value
      this.startAt.next(q)
      this.endAt.next(q+"\uf8ff")
    }
    this.lastKeypress = $event.timeStamp
  }

  detail(recipe): void {
    this.router.navigate(['/recipe-detail', recipe.$key]);
  }
}
