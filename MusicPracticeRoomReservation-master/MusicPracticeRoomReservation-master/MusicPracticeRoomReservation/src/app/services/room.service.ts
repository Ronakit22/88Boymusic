import { Injectable } from '@angular/core';
//models
import { Room } from "../models/room";
import { Time } from "../models/time";
//mock-date
// import { MockRoom } from "../mockdata/mock-room";
import { MockTime } from "../mockdata/mock-time";
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms : Room;

  constructor() { }

  // getSelectRoom(roomtype : string) : Observable<Room>{
  //   return of(MockRoom.find(room => room.room_type === roomtype))
  // }
  geTimescheduleRoom(datetime : string) : Observable<Time[]>{
    return of(MockTime)
  }
}
