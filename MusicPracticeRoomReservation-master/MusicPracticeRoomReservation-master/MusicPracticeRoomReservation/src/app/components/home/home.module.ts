import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

//Angular front-awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
