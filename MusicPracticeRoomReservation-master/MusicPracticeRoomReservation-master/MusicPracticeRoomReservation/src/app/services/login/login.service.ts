import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // check login type observeable
  private lsSource = new BehaviorSubject(new String);
  login_status = this.lsSource.asObservable();
  redirectUrl : any;

  private url: string = "http://localhost:8081/user/login";

  constructor(private http: HttpClient ) {
    this.lsChange(localStorage.getItem('role'));
  }

  login(user: User) {
    return this.http.post(this.url, user).pipe(map(
      (response : any) => {
        if(response == null){
          alert("user ของท่านถูกระงับการใช้งาน");
          return null
        }
        if(response.length != 0){
          localStorage.setItem('auth', response[0].id);
          localStorage.setItem('role', response[0].role);
          this.lsChange(localStorage.getItem('role'));
          return response;
        }else {
          return 0;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    this.lsChange(localStorage.getItem('role'));
  }

  checkLogin(callback){
    if (localStorage.getItem('role') != null && localStorage.getItem('auth') != null){
      return callback(true)
    }else{
      return callback(false)
    }
  }

  lsChange(s) {
    this.lsSource.next(s);
  }
}
