import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  cols: any[];
  user_list: Array<any> = []

  constructor(private reservationservice: ReservationService, private userservice : UserService) { }

  ngOnInit() {
    this.cols = [
      { field: 'index', header: 'ลำดับ' },
      { field: 'user_name', header: 'ชื่อ' },
     // { field: 'user_id', header: 'Email ผู้ใช้' },
      { field: 'reserve_status_0', header: 'รอชำระเงิน' },
      { field: 'reserve_status_1', header: 'รอการตรวจสอบ' },
      { field: 'reserve_status_2', header: 'เสร็จสมบูรณ์' },
     // { field: 'reserve_status_3', header: 'ยกเลิก' },
      { field: 'ban', header: 'ระงับการใช้งาน' }
    ];
    this.getUserList()
  }

  banUser(user : any){
    this.userservice.updateUserStatus(user.user_id,"0").subscribe((res : any) => this.getUserList());
  }

  unbanUser(user : any){
    this.userservice.updateUserStatus(user.user_id,"1").subscribe((res : any) => this.getUserList())
  }

  getUserList(){
    this.reservationservice.getUserReport().subscribe((res : any) => {
      this.user_list = res;
      console.log(this.user_list);
      
    })
  }

}
