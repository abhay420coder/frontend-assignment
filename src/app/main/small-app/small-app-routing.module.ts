import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniapplistComponent } from './miniapplist/miniapplist.component';
import { ToDoListComponent } from '../miniapp/to-do-list/to-do-list.component';
import { SmallAppComponent } from './small-app.component';

const routes: Routes = [
  {
    path: '',
    component:SmallAppComponent,
    children:[
      {
        path: 'miniAppList', 
        component: MiniapplistComponent ,
        data:{title:"Mini-App-List"}
      },
      {
        path: 'miniApp',
        loadChildren: ()=> import('src/app/main/miniapp/miniapp.module').then(m=>m.MiniappModule), 
        data:{title:"Mini App"}
      },
      {
        path: '', 
        redirectTo: "miniAppList",
        pathMatch: "full"
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmallAppRoutingModule { }
