import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

// Router
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { BasisDataCategoryService } from './services/basis-data-category.service';
import { BasisDataCuisineService } from './services/basis-data-cuisine.service';
import { UploadService } from './services/upload.service';
import { RegisterService } from './services/register.service';
import { FavoriteService } from './services/favorite.service';

// App
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

// Public
import { PublicComponent } from './public/public.component';
import { ImpressumComponent } from './public/impressum.component';
import { ContactComponent } from './public/contact.component';
import { AboutComponent } from './public/about.component';
import { NavComponent } from './public/view-nav/nav.component';
import { FooterComponent } from './public/view-footer/footer.component';
import { CoverComponent } from './public/view-recipe/view-cover/cover.component';
import { CategoryListComponent } from './public/view-category/view-list/category-list.component';
import { SearchComponent } from './public/view-search/search.component';
import { PublicReceiptDetailComponent } from './public/view-recipe/view-detail/detail.component';

// Admin
import { AdminComponent } from './admin/admin.component';
import { RecipesListComponent } from './admin/view-list/recipes-list.component';
import { FavoritesListComponent } from './admin/view-list/favorites-list.component';
import { RecipeDetailComponent } from './admin/view-detail/recipe-detail.component';
import { RecipeAddComponent } from './admin/view-form/recipe-add.component';
import { RecipeEditComponent } from './admin/view-form/recipe-edit.component';
import { RecipeSearchComponent } from './admin/view-search/recipe-search.component';
import { NavAdminComponent } from './admin/view-nav/nav-admin.component';
import { AllRecipesListComponent } from './admin/view-list/all-recipes-list.component';

// Master Data Basis
import { BasisDataCategoryComponent } from './admin/basis-data-category.component';
import { BasisDataCuisineComponent } from './admin/basis-data-cuisine.component';

// Register
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './admin/view-list/users-list.component';

// ngx-bootstrap
import { AlertComponent } from './directives/alert/alert.component';
import { PaginationLimitComponent } from './directives/pagination/pagination.component';
import { ModalComponent } from './directives/modal/modal.component';

// Pipes
import { FilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    // Database
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // Auth
    AngularFireAuthModule,
    // ngx-bootstrap
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    // App
    AppComponent,
    PageNotFoundComponent,
    // Public
    PublicComponent,
    ImpressumComponent,
    ContactComponent,
    AboutComponent,
    NavComponent,
    FooterComponent,
    CoverComponent,
    SearchComponent,
    PublicReceiptDetailComponent,
    CategoryListComponent,
    // Admin
    AdminComponent,
    RecipesListComponent,
    FavoritesListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeSearchComponent,
    NavAdminComponent,
    AllRecipesListComponent,
    // Register
    RegisterComponent,
    UsersListComponent,
    // Master Data (Basis),
    BasisDataCategoryComponent,
    BasisDataCuisineComponent,
    // ngx-bootstrap
    AlertComponent,
    PaginationLimitComponent,
    ModalComponent,
    // Pipes
    FilterPipe
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    AuthService,
    RecipeService,
    BasisDataCategoryService,
    BasisDataCuisineService,
    UploadService,
    RegisterService,
    FavoriteService,
    AlertComponent,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


