import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';

import { AppComponent } from './app.component';
import { RecipesListComponent } from './recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeAddComponent } from './recipe-add.component';
import { CrisisListComponent } from './crisis-list.component';
import { PageNotFoundComponent } from './not-found.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    CrisisListComponent,
    PageNotFoundComponent
  ],
  providers: [AuthService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}


