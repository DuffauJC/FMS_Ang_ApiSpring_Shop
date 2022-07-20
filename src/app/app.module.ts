import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CaddyComponent } from './components/caddy/caddy.component';
import { RegisterComponent } from './components/register/register.component'
import { NotFoundComponent } from './components/notFound/notFound.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/admin/homeAdmin.component';
import { AddTrainingComponent } from './components/admin/addTraining/addTraining.component';
import { ListTrainingsComponent } from './components/admin/listTraining/listTrainings.component';
@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CaddyComponent,
    RegisterComponent,
    NotFoundComponent,
    OrderComponent,
    LoginComponent,
    HomeAdminComponent,
    AddTrainingComponent,
    ListTrainingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
