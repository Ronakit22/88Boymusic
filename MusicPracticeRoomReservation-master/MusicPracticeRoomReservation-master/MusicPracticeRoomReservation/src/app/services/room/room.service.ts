import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Room } from 'src/app/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  private url: string = "http://localhost:8081/room/";

  constructor(private http: HttpClient) { }

  createRoom(room: Room) {
    return this.http.post(this.url, room).pipe(map(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        console.log('oops', error)
      })
    );
  }

  getAllRoom(){
    return this.http.get(this.url).pipe();
  }

  getRoomById(id : number){
    return this.http.get(this.url+id).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  updateRoom(room: Room){
    return this.http.put(this.url, room).pipe();
  }

  getImgName(id , type){
    return this.http.get(this.url+"img/filename/"+id+"/"+type).pipe();
  }

  updateImgRoom(type : string, room_id : any, file : any){
    const formData = new FormData();
    formData.append('file', file[0]);
    return this.http.post(this.url+"imgadd/" + room_id + "/" + type, formData).pipe();
  }

  deleletImg(id , type){
    return this.http.get(this.url+"img/"+id+"/"+type).pipe();
  }

  deleletRoom(id){
    return this.http.get(this.url+"delete/"+id).pipe();
  }
}
