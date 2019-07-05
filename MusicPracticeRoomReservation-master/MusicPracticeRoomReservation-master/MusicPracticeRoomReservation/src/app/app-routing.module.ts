import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard";
const routes : Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'home' , 
    loadChildren: './components/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'signup' , 
    loadChildren: './components/signup/signup.module#SignupModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'login' , 
    loadChildren: './components/login/login.module#LoginModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'reserveroom' , 
    loadChildren: './components/booking/booking.module#BookingModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'reservation' , 
    loadChildren: './components/reservation/reservation.module#ReservationModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'record' , 
    loadChildren: './components/record/record.module#RecordModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'profile' , 
    loadChildren: './components/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'manageroom' , 
    loadChildren: './components/manageroom/manageroom.module#ManageroomModule',
    canActivate: [AuthGuard]
  },
  {
    path : 'manageuser' , 
    loadChildren: './components/manageuser/manageuser.module#ManageuserModule',
    // canActivate: [AuthGuard]
  },
  { path: '**', 
    redirectTo : 'home',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}