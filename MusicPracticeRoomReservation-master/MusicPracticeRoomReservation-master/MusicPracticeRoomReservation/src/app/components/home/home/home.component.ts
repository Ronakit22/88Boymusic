import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner/banner.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  fileUploads: Array<Observable<string[]>>
  fileUploadst: Array<string> = [];
  loginstatus: string;

  constructor(private bannerservice : BannerService, private loginservice : LoginService) { }

  ngOnInit() {
    this.bannerservice.getAllBanner().subscribe((res : any) => {
      for (let index = 0; index < res.length; index++) {
        this.fileUploadst.push('http://localhost:8081/banner/' + res[index].img_name);
        console.log(this.fileUploadst);
      }
    });
    this.loginservice.login_status.subscribe(s => {
      this.loginstatus = <string>s;
    })
  }
  

}
