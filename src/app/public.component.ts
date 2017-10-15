import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.less']
})
export class PublicComponent {
  title = 'What to cook?';

  allRecipes: FirebaseListObservable<any[]>;

  constructor(
    private router: Router,
    db: AngularFireDatabase) {
      this.allRecipes = db.list('/recipes');
  }

  detail(recipe): void {
    this.router.navigate(['/recipe-detail', recipe.$key]);
  }

  listRecipeSpecificCategory(category): void {
    this.router.navigate(['/category-list', category]);
  }
}
