import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { JoinComponent } from './pages/join/join.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './core/services/loader.interceptor';
import { LookListenComponent } from './pages/look-listen/look-listen.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { StarsComponent } from './pages/stars/stars.component';
import { StarCardComponent } from './pages/star-card/star-card.component';
import { StarCardDialogComponent } from './pages/star-card-dialog/star-card-dialog.component';
import { HiringComponent } from './pages/hiring/hiring.component';
import { AdminModule } from './pages/Admin/Admin.module';

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    LookListenComponent,
    AboutComponent,
    ContactComponent,
    StarsComponent,
    StarCardComponent,
    StarCardDialogComponent,
    HiringComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2TelInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
