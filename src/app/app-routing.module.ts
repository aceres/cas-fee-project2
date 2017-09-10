import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { CrisisCenterComponent } from './crisis-center.component';
// Public
import { PublicComponent } from './public.component';
// Admin
import { AdminComponent } from './admin/admin.component';
import { RecipesListComponent } from './admin/recipes-list.component';
import { RecipeDetailComponent } from './admin/recipe-detail.component';
import { RecipeAddComponent } from './admin/recipe-add.component';
import { RecipeEditComponent } from './admin/recipe-edit.component';
// Register
import { RegisterComponent } from './register/register.component';
// Master Data Basis
import {BasisDataCategoryComponent} from './admin/basis-data-category.component';
import {BasisDataCuisineComponent} from './admin/basis-data-cuisine.component';

const appRoutes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'recipes', component: RecipesListComponent},
    { path: 'recipe-detail/:id', component: RecipeDetailComponent},
    { path: 'recipe-add', component: RecipeAddComponent},
    { path: 'recipe-edit', component: RecipeEditComponent},
    { path: 'crisis-center', component: CrisisCenterComponent},
    { path: 'basis-data-category', component: BasisDataCategoryComponent},
    { path: 'basis-data-cuisine', component: BasisDataCuisineComponent},
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
