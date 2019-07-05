import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from "../../models/user";
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  
  defualtGender = "Male"
  model: NgbDateStruct;
  today = this.calendar.getToday();
  user : User;

  constructor(private calendar: NgbCalendar,
              private userservice : UserService,
              private route : Router) { }

  ngOnInit() {
  }
  
  onSubmit() {
    console.log("registerForm",this.registerForm);
    this.user = this.registerForm.value;
    this.user.birthday = this.parseDate(this.registerForm.value.dp);
    this.user.img_user = "default.jpg"
    console.log(this.user);
    this.userservice.createUser(this.user).subscribe(response => {
      if(response != 0){
        alert("create User success!! ");
        this.route.navigate(['/home']);
      }else{
        alert("create User fail!! ")
      }
      this.registerForm.reset();
    });
  }

  parseDate(value: any): string {
    let dd = value.day;
    let mm = value.month;
    let yyyy = value.year;
    if (value.day < 10) {
      dd = '0' + dd;
    }
    if (value.month < 10) {
      mm = '0' + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
  }
}
