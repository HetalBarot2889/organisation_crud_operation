import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrgComponent } from './add-org/add-org.component';
import { ListOrgComponent } from './list-org/list-org.component';
import { LoginOrgComponent } from './login-org/login-org.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginOrgComponent },
  { path: 'list', component: ListOrgComponent },
  { path: 'add', component: AddOrgComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
