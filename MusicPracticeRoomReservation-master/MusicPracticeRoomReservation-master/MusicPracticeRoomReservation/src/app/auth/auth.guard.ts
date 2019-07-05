import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  login_role: any

  constructor(private loginservice: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    let id = next.paramMap.get('id')
    console.log(next.paramMap.get('id'));
    

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (localStorage.getItem('role') != null) {
      this.login_role = localStorage.getItem('role');
      if (this.login_role == 'a') {
        if (url == "/login" || url == "/signup" || url == "/profile/editprofile" ) {
          alert("User ทีใช้ไม่มีสิทธิเข้าถึงหน้า :" + url)
          this.router.navigate(['/home']);
          return false
        }
        else {
          return true
        }
      } else if (this.login_role == 'm') {
        if (url == "/login" || url == "/signup" || url == "/manageroom" || url == "/manageroom/edit") {
          alert("User ทีใช้ไม่มีสิทธิเข้าถึงหน้า :" + url)
          this.router.navigate(['/home']);
          return false
        }
        else {
          return true
        }
      }
    } else {
      if (url == "/home" || url == "/reserveroom" || url == "/signup" || url == "/login")
        return true
      else {
        alert("กรุณา Login ก่อนเข้าถึงหน้า :" + url)
        this.router.navigate(['/login']);
        return false
      }
    }
  }

}
