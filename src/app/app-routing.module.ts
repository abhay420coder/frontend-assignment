import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponentComponent } from './pagenotfound-component/pagenotfound-component.component';
// import { AuthGuard, CanActivateChildGuard, RestrictAuthedUserGuard } from '../app/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: "miniApp",
    pathMatch: "full"
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
