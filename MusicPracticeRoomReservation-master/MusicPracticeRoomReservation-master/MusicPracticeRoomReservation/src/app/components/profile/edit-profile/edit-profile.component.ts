import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('f') updateUserForm: NgForm;

  public imagePath;
  public message: string;
  imgURL: any = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  user : User;
  update_user : User;
  image : File;
  addimage_status : boolean = false;

  constructor(private userservice : UserService) { }

  ngOnInit() {
    this.user = {
      id : 0,
      email : "",
      role : "",
      password : "",
      firstname : "",
      lastname : "",
      gender : "",
      birthday : "",
      address : "",
      tel : "",
      img_user : "",
      user_status : ""
    }
    this.userservice.getUserByid(localStorage.getItem('auth')).subscribe((res : any) => {
      this.user = res[0];
      this.imgURL = 'http://localhost:8081/user/imguser/' +  res[0].img_user;
    })
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.image = files;
    this.addimage_status = true;
  }

  onSubmit(){
    this.user.firstname = this.updateUserForm.value.firstname;
    this.user.lastname = this.updateUserForm.value.lastname;
    this.user.address = this.updateUserForm.value.address;
    this.user.tel = this.updateUserForm.value.tel;
    this.user.email = this.updateUserForm.value.email;
    this.userservice.updateUser(this.user).subscribe((res : any) => {
      if(res == 1 ){
        if(this.addimage_status){
          this.userservice.updateImgUser(this.user.id, this.image).subscribe((res2 : any) => {alert(res2)})
        }
        alert("Update User Success!!");
      }else{
        alert("Update User Fail!!");
      }
    })
  }
}
