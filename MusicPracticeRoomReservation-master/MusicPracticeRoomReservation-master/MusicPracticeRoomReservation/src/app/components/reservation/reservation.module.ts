import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepsModule} from 'primeng/steps';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [ReservationComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    StepsModule
  ]
})
export class ReservationModule { }
