import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponentComponent } from './pagenotfound-component/pagenotfound-component.component';
import { LoginComponent } from './auth/login/login.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LogoutComponent } from './auth/logout/logout.component';
// import { AuthGuard, CanActivateChildGuard, RestrictAuthedUserGuard } from '../app/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: "miniApp",
    pathMatch: "full"
  },
  {
    path:"login",
    component:LoginComponent,
    data: { title: "Login" }
  },

  {
    path:"register",
    component:NewUserComponent,
    data: { title: "New User" }
  },

  {
    path:"forgot-password",
    component:ForgotComponent,
    data: { title: "Forgot - Password" }
  },
  {
    path:"logout",
    component:LogoutComponent,
    data: { title: "Logout" }
  },

  {
    path:"miniApp",
    loadChildren: ()=> import('src/app/main/small-app/small-app.module').then(m=>m.SmallAppModule),
    data: { title: "miniApp" }
  },

  {
    path: '**', 
    pathMatch: 'full', 
    component: PagenotfoundComponentComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
