import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiniappRoutingModule } from './miniapp-routing.module';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    MiniappRoutingModule,
    ReactiveFormsModule
  ]
})
export class MiniappModule { }
