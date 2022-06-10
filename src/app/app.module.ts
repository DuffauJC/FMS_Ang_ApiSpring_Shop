import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainingReducer } from './state/trainings.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';
import { TrainingsEffects } from './state/trainings.effects';

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
import { ListTrainingComponent } from './components/admin/listTraining/listTraining.component';
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
    ListTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ trainings: TrainingReducer }),
    StoreDevtoolsModule.instrument(),  // redux coté navigateur
    EffectsModule.forRoot([TrainingsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
