import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AccordionModule, InputTextModule, ButtonModule, DataTableModule, DialogModule } from 'primeng/primeng';

import { AuthService } from './auth.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    DialogModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
