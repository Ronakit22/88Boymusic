import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";


//ng-bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    NgbModule,
    FormsModule
  ],
  declarations: [SignupComponent,ConfirmEqualValidatorDirective]
})
export class SignupModule { }
