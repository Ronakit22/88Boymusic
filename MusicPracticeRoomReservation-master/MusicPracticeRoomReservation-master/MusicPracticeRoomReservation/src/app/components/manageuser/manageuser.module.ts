import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageuserRoutingModule } from './manageuser-routing.module';
import { UserListComponent } from './user-list/user-list.component';

//primeNG
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    ManageuserRoutingModule,
    TableModule
  ]
})
export class ManageuserModule { }
