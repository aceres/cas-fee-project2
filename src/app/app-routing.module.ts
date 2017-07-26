import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesListComponent } from './recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeAddComponent } from './recipe-add.component';
import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'recipe-add', component: RecipeAddComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
