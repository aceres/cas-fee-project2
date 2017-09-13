import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { Recipe } from './services/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  // Standard Angular CLI
  title = 'What to cook?';

  // Authentication
  email: string;
  password: string;

  constructor(public authService: AuthService, private recipeService: RecipeService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  // Search recipe
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .then(recipes => this.recipes);
      // TODO: Why was this not working
      // .then(recipes => this.recipes = recipes.slice(1, 5));
  }
}
