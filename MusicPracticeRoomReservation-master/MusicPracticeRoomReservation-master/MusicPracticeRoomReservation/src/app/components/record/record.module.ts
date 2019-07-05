import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordRoutingModule } from './record-routing.module';
import { RecordComponent } from './record/record.component';

//primeNG
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [RecordComponent],
  imports: [
    CommonModule,
    RecordRoutingModule,
    TableModule,
    DropdownModule
  ]
})
export class RecordModule { }
