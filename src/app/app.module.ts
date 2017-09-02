import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Router
import { AppRoutingModule } from './app-routing.module';

// TODO: Clean up
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';

// Services
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';

// App
import { AppComponent } from './app.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { PageNotFoundComponent } from './not-found.component';

// Public
import { PublicComponent } from './public.component';
import { NavComponent } from "./nav/nav.component";
import { CarouselComponent } from "./carousel/carousel.component";

// Admin
import { AdminComponent } from './admin/admin.component';
import { RecipesListComponent } from './admin/recipes-list.component';
import { RecipeDetailComponent } from './admin/recipe-detail.component';
import { RecipeAddComponent } from './admin/recipe-add.component';
import { RecipeSearchComponent } from './admin/recipe-search.component';

// Master Data Basis
import { BasisDataCategoryComponent } from './admin/basis-data-category.component';
import { BasisDataCuisineComponent } from './admin/basis-data-cuisine.component';

// Register
import { RegisterComponent } from './register/register.component';

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
    AngularFireAuthModule
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
    // Admin
    AdminComponent,
    RecipesListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeSearchComponent,
    // Register
    RegisterComponent,
    // Master Data (Basis),
    BasisDataCategoryComponent,
    BasisDataCuisineComponent
  ],
  providers: [AuthService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}


