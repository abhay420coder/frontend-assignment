import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniapplistComponent } from './miniapplist/miniapplist.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
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
        path: 'todo', 
        component: ToDoListComponent ,
        data:{title:"ToDo-App"}
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmallAppRoutingModule { }
