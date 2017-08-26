import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
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
