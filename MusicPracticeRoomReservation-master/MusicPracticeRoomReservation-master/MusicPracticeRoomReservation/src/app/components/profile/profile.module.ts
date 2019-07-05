import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ProfileRoutingModule } from './profile-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
