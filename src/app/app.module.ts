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

// App
import { AppComponent } from './app.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { PageNotFoundComponent } from './not-found.component';

// Public
import { PublicComponent } from './public.component';
import { NavComponent } from './nav/nav.component';
import { CoverComponent } from './cover/cover.component';
import { CategoryListComponent } from './category-list.component';
import { SearchComponent } from './search.component';
import { PublicReceiptDetailComponent } from './detail.component';

// Admin
import { AdminComponent } from './admin/admin.component';
import { RecipesListComponent } from './admin/recipes-list.component';
import { RecipeDetailComponent } from './admin/recipe-detail.component';
import { RecipeAddComponent } from './admin/recipe-add.component';
import { RecipeEditComponent } from './admin/recipe-edit.component';
import { RecipeSearchComponent } from './admin/recipe-search.component';

// Master Data Basis
import { BasisDataCategoryComponent } from './admin/basis-data-category.component';
import { BasisDataCuisineComponent } from './admin/basis-data-cuisine.component';

// Register
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './admin/users-list.component';

// ngx-bootstrap
import { AlertComponent } from './directives/alert/alert.component';
import { PaginationLimitComponent } from './directives/pagination/pagination.component';
import { ModalContentComponent } from './directives/modal/modal.component';

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
    CrisisCenterComponent,
    // Public
    PublicComponent,
    NavComponent,
    CoverComponent,
    SearchComponent,
    PublicReceiptDetailComponent,
    CategoryListComponent,
    // Admin
    AdminComponent,
    RecipesListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeSearchComponent,
    // Register
    RegisterComponent,
    UsersListComponent,
    // Master Data (Basis),
    BasisDataCategoryComponent,
    BasisDataCuisineComponent,
    // ngx-bootstrap
    AlertComponent,
    PaginationLimitComponent,
    ModalContentComponent,
    // Pipes
    FilterPipe
  ],
  providers: [
    AuthService,
    RecipeService,
    BasisDataCategoryService,
    BasisDataCuisineService,
    UploadService,
    RegisterService,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


