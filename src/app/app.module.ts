import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleReducer } from './state/articles.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffects } from './state/articles.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { CaddyComponent } from './components/caddy/caddy.component';
import { RegisterComponent } from './components/register/register.component'
import { NotFoundComponent } from './components/notFound/notFound.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/admin/homeAdmin.component';
import { AddArticleComponent } from './components/admin/addArticle/addArticle.component';
import { ListArticlesComponent } from './components/admin/listArticle/listArticles.component';
@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    CaddyComponent,
    RegisterComponent,
    NotFoundComponent,
    OrderComponent,
    LoginComponent,
    HomeAdminComponent,
    AddArticleComponent,
    ListArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ articles: ArticleReducer }),
    StoreDevtoolsModule.instrument(),  // redux coté navigateur
    EffectsModule.forRoot([ArticlesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
