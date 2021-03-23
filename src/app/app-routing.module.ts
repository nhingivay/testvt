import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailuserComponent } from './detailuser/detailuser.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserlistComponent,
  },
  {
    path: 'user/:id',
    component: DetailuserComponent,
  },
  {
    path: 'user/new',
    component: DetailuserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [LoginComponent];
