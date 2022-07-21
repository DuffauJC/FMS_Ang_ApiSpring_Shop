import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './components/_helpers/authGuard.components';
import { Role } from './model/role';

import { CategoriesComponent } from './components/categories/categories.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CategoryTrainingsComponent } from './components/categoryTraining/categoryTrainings.component';
import { CaddyComponent } from './components/caddy/caddy.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/admin/homeAdmin.component';
import { AddTrainingComponent } from './components/admin/addTraining/addTraining.component';
import { ListTrainingsComponent } from './components/admin/listTraining/listTrainings.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'trainings', component: TrainingsComponent },
  {
    path: 'trainingsByCategory/:id', component: CategoryTrainingsComponent
  },
  {path: 'caddy', component: CaddyComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'addTraining',
    component: AddTrainingComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'listTrainings',
    component: ListTrainingsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },



  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
