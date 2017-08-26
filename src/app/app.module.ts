import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register.component';
import { DashboardComponent } from './dashboard.component';
import { RecipesListComponent } from './recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeAddComponent } from './recipe-add.component';
import { RecipeSearchComponent } from './recipe-search.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { PageNotFoundComponent } from './not-found.component';
import { NavComponent } from "./nav/nav.component";
import { CarouselComponent } from "./carousel/carousel.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    AdminComponent,
    RegisterComponent,
    DashboardComponent,
    RecipesListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeSearchComponent,
    CrisisCenterComponent,
    PageNotFoundComponent,
    NavComponent,
    CarouselComponent
  ],
  providers: [AuthService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}


