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
// Register
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'public', component: PublicComponent },
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
