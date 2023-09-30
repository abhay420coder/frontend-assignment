import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmallAppRoutingModule } from './small-app-routing.module';
import { ToDoListComponent } from './to-do-list/to-do-list.component';


@NgModule({
  declarations: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    SmallAppRoutingModule
  ]
})
export class SmallAppModule { }
