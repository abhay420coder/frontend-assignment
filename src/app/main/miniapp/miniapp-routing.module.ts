import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: 'todo',
    component:ToDoListComponent,
    data: { title: "Todo App" },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: "todo",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiniappRoutingModule { }
