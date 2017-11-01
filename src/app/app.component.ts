import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';

import { Recipe } from './services/models/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Manducare';

  constructor(
    public authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {}
}
