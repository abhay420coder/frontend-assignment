import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmallAppRoutingModule } from './small-app-routing.module';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { MiniapplistComponent } from './miniapplist/miniapplist.component';
import { MiniappcardComponent } from './miniappcard/miniappcard.component';
import { SmallAppComponent } from './small-app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToDoListComponent,
    MiniapplistComponent,
    MiniappcardComponent,
    SmallAppComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SmallAppRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SmallAppModule { }
