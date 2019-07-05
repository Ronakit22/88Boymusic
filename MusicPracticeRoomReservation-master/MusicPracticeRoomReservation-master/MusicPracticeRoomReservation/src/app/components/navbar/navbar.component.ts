import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username : string
  loginstatus: string;

  constructor(private loginservice : LoginService, private router : Router,
              private userservice : UserService) {}

  ngOnInit() {
    this.loginservice.login_status.subscribe(s => {
      console.log("navbar OI",s);
      this.loginstatus = <string>s;
      if(this.loginstatus != null){
        this.userservice.getUserByid(localStorage.getItem('auth')).subscribe((res : any) =>{
          this.username = res[0].firstname;
        })
      }
    })
  }

  logOut(){
    this.username = null;
    this.loginservice.logout();
    this.router.navigate(['/home']);
  }
}
