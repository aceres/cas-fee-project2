import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App
import { PageNotFoundComponent } from './not-found.component';
// Public
import { PublicComponent } from './public/public.component';
import { ImpressumComponent } from './public/impressum.component';
import { ContactComponent } from './public/contact.component';
import { AboutComponent } from './public/about.component';
import { PublicReceiptDetailComponent } from './public/view-recipe/view-detail/detail.component';
import { CategoryListComponent } from './public/view-category/view-list/category-list.component';
// Admin
import { AdminComponent } from './admin/admin.component';
import { RecipesListComponent } from './admin/view-list/recipes-list.component';
import { FavoritesListComponent } from './admin/view-list/favorites-list.component';
import { RecipeDetailComponent } from './admin/view-detail/recipe-detail.component';
import { RecipeAddComponent } from './admin/view-form/recipe-add.component';
import { RecipeEditComponent } from './admin/view-form/recipe-edit.component';
import { AllRecipesListComponent } from './admin/view-list/all-recipes-list.component';
// Register
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './admin/view-list/users-list.component';
// Master Data Basis
import { BasisDataCategoryComponent } from './admin/basis-data-category.component';
import { BasisDataCuisineComponent } from './admin/basis-data-cuisine.component';

const appRoutes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipe-detail/:id', component: PublicReceiptDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category-list/:category', component: CategoryListComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'recipes', component: RecipesListComponent},
    { path: 'favorites', component: FavoritesListComponent},
    { path: 'recipe-detail/:id', component: RecipeDetailComponent},
    { path: 'recipe-add', component: RecipeAddComponent},
    { path: 'recipe-edit/:id', component: RecipeEditComponent},
    { path: 'basis-data-category', component: BasisDataCategoryComponent},
    { path: 'basis-data-cuisine', component: BasisDataCuisineComponent},
    { path: 'users', component: UsersListComponent},
    { path: 'all-recipes', component: AllRecipesListComponent}
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
