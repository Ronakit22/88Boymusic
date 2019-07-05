import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private router : Router,
              private loginservice : LoginService ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.loginservice.login(this.loginForm.value).subscribe(data => {
      if(data != 0) this.router.navigate(['/home']);
      else alert("user or password incorrect");
    });
  }

}
