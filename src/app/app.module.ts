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

// Router
import { AppRoutingModule } from './app-routing.module';

// TODO: Clean up
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';

// Services
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { BasisDataCategoryService } from './services/basis-data-category.service';
import { BasisDataCuisineService } from './services/basis-data-cuisine.service';
import { UploadService } from './services/upload.service';

// App
import { AppComponent } from './app.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { PageNotFoundComponent } from './not-found.component';

// Public
import { PublicComponent } from './public.component';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DetailCoverComponent } from './detailcover/detail-cover.component';
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

// ngx-bootstrap
import { AlertComponent } from './directives/alert/alert.component';
import { PaginationLimitComponent } from './directives/pagination/pagination.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    // TODO: Clean up
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    // Database
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // Auth
    AngularFireAuthModule,
    // ngx-bootstrap
    AlertModule.forRoot(),
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
    CarouselComponent,
    SearchComponent,
    PublicReceiptDetailComponent,
    DetailCoverComponent,
    // Admin
    AdminComponent,
    RecipesListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeSearchComponent,
    // Register
    RegisterComponent,
    // Master Data (Basis),
    BasisDataCategoryComponent,
    BasisDataCuisineComponent,
    // ngx-bootstrap
    AlertComponent,
    PaginationLimitComponent
  ],
  providers: [AuthService, RecipeService, BasisDataCategoryService, BasisDataCuisineService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {}


