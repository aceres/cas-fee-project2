import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RecipeSearchService } from './recipe-search.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
  providers: [RecipeSearchService]
})
export class RecipeSearchComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private recipeSearchService: RecipeSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.recipes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.recipeSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Recipe[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Recipe[]>([]);
      });
  }

  gotoDetail(recipe: Recipe): void {
    const link = ['/admin/recipe-detail', recipe.id];
    this.router.navigate(link);
  }
}
