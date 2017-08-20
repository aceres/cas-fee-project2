import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register.component';
import { RecipesListComponent } from './recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeAddComponent } from './recipe-add.component';
import { DashboardComponent } from './dashboard.component';
import { PageNotFoundComponent } from './not-found.component';
import { CrisisCenterComponent } from './crisis-center.component';

const appRoutes: Routes = [
  { path: 'public', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'recipes', component: RecipesListComponent},
    { path: 'recipe-detail/:id', component: RecipeDetailComponent},
    { path: 'recipe-add', component: RecipeAddComponent},
    { path: 'crisis-center', component: CrisisCenterComponent},
  ] },
  { path: '', redirectTo: '/public', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
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
