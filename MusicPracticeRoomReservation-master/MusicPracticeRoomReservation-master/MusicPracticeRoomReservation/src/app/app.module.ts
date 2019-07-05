import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

//ng-bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
