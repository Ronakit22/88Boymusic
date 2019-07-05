import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoomComponent } from './list-room/list-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';


const routes: Routes = [
  { 
    path : '', component : ListRoomComponent 
  },
  {
    path : 'edit/:id', component : EditRoomComponent
  },
  {
    path : 'edit' , component : EditRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageroomRoutingModule { }
