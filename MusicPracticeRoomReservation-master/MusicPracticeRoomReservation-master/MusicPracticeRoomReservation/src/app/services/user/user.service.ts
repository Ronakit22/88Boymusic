import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://localhost:8081/user/"

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(this.url, user).pipe(map(
      (response : any) => {
        console.log(response);
        return response;
      },
      (err) => {
        console.log('oops', err)
      })
    );
  }

  getUserByid(user_id : any){
    return this.http.get(this.url + user_id).pipe()
  }

  updateUser(user: User){
    return this.http.put(this.url, user).pipe();
  }

  updateImgUser(user_id : any, file : any){
    const formData = new FormData();
    formData.append('file', file[0]);
    return this.http.post("http://localhost:8081/user/imguser/" + user_id, formData).pipe();
  }

  updateUserStatus(user_id : any, user_status : any){
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('user_status', user_status);
    return this.http.post(this.url + "updateuserstatus/", formData).pipe();
  }

}
